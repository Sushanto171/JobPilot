import { fastify } from "@/app";
import { BcryptHelper } from "@/app/helpers/bcrypt";
import { AppError } from "@/app/utils/AppError";
import { randomBytes } from "node:crypto";
import { generateSecret, generateURI, verify } from "otplib";
import { UserService } from "../users/user.service";
import { sendVerificationEmail } from "./auth.email";
import {
  createAccessToken,
  createRefreshToken,
  hashToken,
  saveRefreshToken,
  verifyAccessToken,
} from "./auth.tokens";
import {
  ChangePasswordInput,
  DisableTwoFactorInput,
  LoginInput,
  RegisterInput,
} from "./auth.validation";

const userService = new UserService();
type RequestWithCookies = { cookies: Record<string, string | undefined> };

export class AuthService {
  private async createSession(user: { id: string; role: string }) {
    const accessToken = await createAccessToken(user.id, user.role);
    const refreshToken = createRefreshToken();
    await saveRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken };
  }

  private async getAuthenticatedUser(request: RequestWithCookies) {
    const accessToken = request.cookies.jobpilot_access_token;
    if (!accessToken) throw new AppError("Authentication required", 401);
    const { userId } = await verifyAccessToken(accessToken);
    const user = await fastify.prisma.User.first({ id: userId });
    if (!user) throw new AppError("Authentication required", 401);
    return user;
  }

  private async createVerificationToken(userId: string, email: string) {
    const token = randomBytes(32).toString("base64url");
    await fastify.prisma.EmailVerificationToken.create({
      userId,
      tokenHash: hashToken(token),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });
    await sendVerificationEmail(email, token);
  }

  async register(data: RegisterInput) {
    const existingUser = await fastify.prisma.User.first({ email: data.email });
    if (existingUser)
      throw new AppError("A user with this email already exists", 409);
    const user = await userService.createUser(data);
    if (!user) throw new AppError("Unable to create user", 500);
    await this.createVerificationToken(user.id, user.email);
    return { user, emailVerificationRequired: true };
  }

  async login(data: LoginInput) {
    const user = await fastify.prisma.User.first({ email: data.email });
    if (
      !user ||
      !(await BcryptHelper.comparePasswords(data.password, user.password))
    ) {
      throw new AppError("Invalid email or password", 401);
    }
    if (!user.emailVerified)
      throw new AppError("Please verify your email before logging in", 403);
    if (user.twoFactorEnabled) {
      if (!data.code || !user.twoFactorSecret)
        throw new AppError("Two-factor code is required", 401);
      const result = await verify({
        secret: user.twoFactorSecret,
        token: data.code,
      });
      if (!result.valid) throw new AppError("Invalid two-factor code", 401);
    }
    const session = await this.createSession(user);
    const { password, twoFactorSecret, ...safeUser } = user;
    return { user: safeUser, ...session };
  }

  async verifyEmail(token: string) {
    const verification = await fastify.prisma.EmailVerificationToken.first({
      tokenHash: hashToken(token),
    });
    if (
      !verification ||
      verification.usedAt ||
      new Date(verification.expiresAt) <= new Date()
    ) {
      throw new AppError("Invalid or expired verification token", 400);
    }
    await fastify.prisma.EmailVerificationToken.where({
      id: verification.id,
    }).update({ usedAt: new Date().toISOString() });
    await fastify.prisma.User.where({ id: verification.userId }).update({
      emailVerified: true,
    });
    return { emailVerified: true };
  }

  async resendVerification(email: string) {
    const user = await fastify.prisma.User.first({ email });
    if (user && !user.emailVerified)
      await this.createVerificationToken(user.id, user.email);
    return {
      message: "If the account exists and is unverified, a new email was sent",
    };
  }

  async refresh(refreshToken: string) {
    const storedToken = await fastify.prisma.RefreshToken.first({
      tokenHash: hashToken(refreshToken),
    });
    if (
      !storedToken ||
      storedToken.revokedAt ||
      new Date(storedToken.expiresAt) <= new Date()
    ) {
      throw new AppError("Invalid or expired refresh token", 401);
    }
    const user = await fastify.prisma.User.first({ id: storedToken.userId });
    if (!user) throw new AppError("Authentication required", 401);
    await fastify.prisma.RefreshToken.where({ id: storedToken.id }).update({
      revokedAt: new Date().toISOString(),
    });
    const { password, twoFactorSecret, ...safeUser } = user;
    return { user: safeUser, ...(await this.createSession(user)) };
  }

  async logout(refreshToken?: string) {
    if (!refreshToken) return;
    const storedToken = await fastify.prisma.RefreshToken.first({
      tokenHash: hashToken(refreshToken),
    });
    if (storedToken && !storedToken.revokedAt) {
      await fastify.prisma.RefreshToken.where({ id: storedToken.id }).update({
        revokedAt: new Date().toISOString(),
      });
    }
  }

  async changePassword(request: RequestWithCookies, data: ChangePasswordInput) {
    const user = await this.getAuthenticatedUser(request);
    if (
      !(await BcryptHelper.comparePasswords(
        data.currentPassword,
        user.password,
      ))
    ) {
      throw new AppError("Current password is incorrect", 400);
    }
    await fastify.prisma.User.where({ id: user.id }).update({
      password: await BcryptHelper.hashPassword(data.newPassword),
    });
    return { changed: true };
  }

  async setupTwoFactor(request: RequestWithCookies) {
    const user = await this.getAuthenticatedUser(request);
    if (user.twoFactorEnabled)
      throw new AppError("Two-factor authentication is already enabled", 400);
    const secret = generateSecret();
    await fastify.prisma.User.where({ id: user.id }).update({
      twoFactorSecret: secret,
    });
    return {
      secret,
      otpauthUrl: generateURI({
        issuer: "JobPilot",
        label: user.email,
        secret,
      }),
    };
  }

  async enableTwoFactor(request: RequestWithCookies, code: string) {
    const user = await this.getAuthenticatedUser(request);
    if (!user.twoFactorSecret)
      throw new AppError("Set up two-factor authentication first", 400);
    const result = await verify({ secret: user.twoFactorSecret, token: code });
    if (!result.valid) throw new AppError("Invalid two-factor code", 400);
    await fastify.prisma.User.where({ id: user.id }).update({
      twoFactorEnabled: true,
    });
    return { enabled: true };
  }

  async disableTwoFactor(
    request: RequestWithCookies,
    data: DisableTwoFactorInput,
  ) {
    const user = await this.getAuthenticatedUser(request);
    if (!user.twoFactorEnabled || !user.twoFactorSecret)
      throw new AppError("Two-factor authentication is not enabled", 400);
    if (!(await BcryptHelper.comparePasswords(data.password, user.password)))
      throw new AppError("Password is incorrect", 400);
    const result = await verify({
      secret: user.twoFactorSecret,
      token: data.code,
    });
    if (!result.valid) throw new AppError("Invalid two-factor code", 400);
    await fastify.prisma.User.where({ id: user.id }).update({
      twoFactorEnabled: false,
      twoFactorSecret: null,
    });
    return { enabled: false };
  }
}

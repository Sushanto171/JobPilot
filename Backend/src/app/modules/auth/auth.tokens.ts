import { fastify } from "@/app";
import { AppError } from "@/app/utils/AppError";
import { jwtVerify, SignJWT } from "jose";
import { createHash, randomBytes } from "node:crypto";

export const ACCESS_COOKIE = "jobpilot_access_token";
export const REFRESH_COOKIE = "jobpilot_refresh_token";
export const ACCESS_TOKEN_TTL_MS = 15 * 60 * 1000;
export const REFRESH_TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000;

const jwtSecret = new TextEncoder().encode(
  process.env.JWT_ACCESS_SECRET || "jobpilot-development-secret-change-me",
);

export const hashToken = (token: string) =>
  createHash("sha256").update(token).digest("hex");

export const createAccessToken = async (userId: string, role: string) =>
  new SignJWT({ role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(jwtSecret);

export const verifyAccessToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, jwtSecret);
    if (!payload.sub) throw new AppError("Missing token subject");
    return { userId: payload.sub };
  } catch {
    throw new AppError("Authentication required", 401);
  }
};

export const createRefreshToken = () => randomBytes(48).toString("base64url");

export const saveRefreshToken = async (userId: string, token: string) =>
  fastify.prisma.RefreshToken.create({
    userId,
    tokenHash: hashToken(token),
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_MS).toISOString(),
  });

export const setAuthCookies = (
  reply: import("fastify").FastifyReply,
  accessToken: string,
  refreshToken: string,
) => {
  const secure = process.env.NODE_ENV === "production";
  reply.setCookie(ACCESS_COOKIE, accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: ACCESS_TOKEN_TTL_MS / 1000,
  });
  reply.setCookie(REFRESH_COOKIE, refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/api/v1/auth",
    maxAge: REFRESH_TOKEN_TTL_MS / 1000,
  });
};

export const clearAuthCookies = (reply: import("fastify").FastifyReply) => {
  reply.clearCookie(ACCESS_COOKIE, { path: "/" });
  reply.clearCookie(REFRESH_COOKIE, { path: "/api/v1/auth" });
};

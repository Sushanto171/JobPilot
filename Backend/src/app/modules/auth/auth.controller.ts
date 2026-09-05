import { catchAsync } from "@/app/helpers/catchAsync";
import { sendReply } from "@/app/utils/SendReply";
import { AuthService } from "./auth.service";
import {
  clearAuthCookies,
  REFRESH_COOKIE,
  setAuthCookies,
} from "./auth.tokens";
import {
  ChangePasswordInput,
  DisableTwoFactorInput,
  LoginInput,
  RegisterInput,
  ResendVerificationInput,
  TwoFactorCodeInput,
  VerifyEmailInput,
} from "./auth.validation";

const authService = new AuthService();

export class AuthController {
  register = catchAsync(async (request, reply) => {
    const result = await authService.register(request.body as RegisterInput);
    sendReply(reply, 201, true, "User registered successfully", result);
  });

  login = catchAsync(async (request, reply) => {
    const result = await authService.login(request.body as LoginInput);
    setAuthCookies(reply, result.accessToken, result.refreshToken);
    const { accessToken, refreshToken, ...response } = result;
    sendReply(reply, 200, true, "Login successful", response);
  });

  verifyEmail = catchAsync(async (request, reply) => {
    const { token } = request.query as VerifyEmailInput;
    const result = await authService.verifyEmail(token);
    sendReply(reply, 200, true, "Email verified successfully", result);
  });

  resendVerification = catchAsync(async (request, reply) => {
    const { email } = request.body as ResendVerificationInput;
    const result = await authService.resendVerification(email);
    sendReply(reply, 200, true, result.message);
  });

  refresh = catchAsync(async (request, reply) => {
    const refreshToken = request.cookies[REFRESH_COOKIE];
    if (!refreshToken) {
      sendReply(reply, 401, false, "Refresh token is required");
      return;
    }
    const result = await authService.refresh(refreshToken);
    setAuthCookies(reply, result.accessToken, result.refreshToken);
    const {
      accessToken,
      refreshToken: rotatedRefreshToken,
      ...response
    } = result;
    sendReply(reply, 200, true, "Token refreshed successfully", response);
  });

  logout = catchAsync(async (request, reply) => {
    await authService.logout(request.cookies[REFRESH_COOKIE]);
    clearAuthCookies(reply);
    sendReply(reply, 200, true, "Logged out successfully");
  });

  changePassword = catchAsync(async (request, reply) => {
    const result = await authService.changePassword(
      request,
      request.body as ChangePasswordInput,
    );
    sendReply(reply, 200, true, "Password changed successfully", result);
  });

  setupTwoFactor = catchAsync(async (request, reply) => {
    const result = await authService.setupTwoFactor(request);
    sendReply(reply, 200, true, "Two-factor setup created", result);
  });

  enableTwoFactor = catchAsync(async (request, reply) => {
    const { code } = request.body as TwoFactorCodeInput;
    const result = await authService.enableTwoFactor(request, code);
    sendReply(reply, 200, true, "Two-factor authentication enabled", result);
  });

  disableTwoFactor = catchAsync(async (request, reply) => {
    const result = await authService.disableTwoFactor(
      request,
      request.body as DisableTwoFactorInput,
    );
    sendReply(reply, 200, true, "Two-factor authentication disabled", result);
  });
}

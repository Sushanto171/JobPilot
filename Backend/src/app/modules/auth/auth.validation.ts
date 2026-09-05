import { z } from "zod";

export class AuthValidation {
  registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });

  loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
    code: z
      .string()
      .regex(/^\d{6}$/, "Verification code must be 6 digits")
      .optional(),
  });

  verifyEmailSchema = z.object({
    token: z.string().min(1, "Verification token is required"),
  });
  changePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters long"),
  });
  resendVerificationSchema = z.object({
    email: z.email("Invalid email address"),
  });
  twoFactorCodeSchema = z.object({
    code: z.string().regex(/^\d{6}$/, "Verification code must be 6 digits"),
  });
  disableTwoFactorSchema = z.object({
    password: z.string().min(1, "Password is required"),
    code: z.string().regex(/^\d{6}$/, "Verification code must be 6 digits"),
  });
}

export type RegisterInput = z.infer<AuthValidation["registerSchema"]>;
export type LoginInput = z.infer<AuthValidation["loginSchema"]>;
export type VerifyEmailInput = z.infer<AuthValidation["verifyEmailSchema"]>;
export type ChangePasswordInput = z.infer<
  AuthValidation["changePasswordSchema"]
>;
export type ResendVerificationInput = z.infer<
  AuthValidation["resendVerificationSchema"]
>;
export type TwoFactorCodeInput = z.infer<AuthValidation["twoFactorCodeSchema"]>;
export type DisableTwoFactorInput = z.infer<
  AuthValidation["disableTwoFactorSchema"]
>;

import { validateBodyHook } from "@/app/hooks/validateBodyHook";
import { FastifyInstance } from "fastify";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";

const authValidation = new AuthValidation();
const authController = new AuthController();

export const authRouter = async (fastify: FastifyInstance) => {
  fastify.post(
    "/register",
    { preValidation: [validateBodyHook(authValidation.registerSchema)] },
    authController.register,
  );
  fastify.post(
    "/login",
    { preValidation: [validateBodyHook(authValidation.loginSchema)] },
    authController.login,
  );
  fastify.get("/verify-email", authController.verifyEmail);
  fastify.post(
    "/resend-verification",
    {
      preValidation: [
        validateBodyHook(authValidation.resendVerificationSchema),
      ],
    },
    authController.resendVerification,
  );
  fastify.post("/refresh", authController.refresh);
  fastify.post("/logout", authController.logout);
  fastify.post(
    "/change-password",
    { preValidation: [validateBodyHook(authValidation.changePasswordSchema)] },
    authController.changePassword,
  );
  fastify.post("/2fa/setup", authController.setupTwoFactor);
  fastify.post(
    "/2fa/enable",
    { preValidation: [validateBodyHook(authValidation.twoFactorCodeSchema)] },
    authController.enableTwoFactor,
  );
  fastify.post(
    "/2fa/disable",
    {
      preValidation: [validateBodyHook(authValidation.disableTwoFactorSchema)],
    },
    authController.disableTwoFactor,
  );
};

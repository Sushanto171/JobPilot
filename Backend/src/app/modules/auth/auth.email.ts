import { AppError } from "@/app/utils/AppError";
import nodemailer from "nodemailer";

const getTransporter = () => {
  if (!process.env.SMTP_HOST) return null;
  const transportOptions = {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    ...(process.env.SMTP_USER && process.env.SMTP_PASSWORD
      ? {
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
          },
        }
      : {}),
  };
  return nodemailer.createTransport(transportOptions);
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `${process.env.AUTH_API_URL || "http://localhost:3000/api/v1/auth"}/verify-email?token=${encodeURIComponent(token)}`;
  const transporter = getTransporter();

  if (!transporter) {
    console.info(`Email verification URL for ${email}: ${verificationUrl}`);
    return;
  }

  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  if (!from) throw new AppError("SMTP_FROM or SMTP_USER must be configured");
  await transporter.sendMail({
    from,
    to: email,
    subject: "Verify your JobPilot email",
    text: `Verify your email by opening this link: ${verificationUrl}`,
    html: `<p>Verify your JobPilot email:</p><p><a href="${verificationUrl}">${verificationUrl}</a></p>`,
  });
};

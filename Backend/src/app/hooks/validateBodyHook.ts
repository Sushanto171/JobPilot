import { FastifyReply, FastifyRequest } from "fastify";
import { ZodSchema } from "zod";
import { AppError } from "../utils/AppError";

export const validateBodyHook =
  (schema: ZodSchema) =>
  async (request: FastifyRequest, reply: FastifyReply) => {
    const body = request.body;
    const result = schema.safeParse(body);
    if (!result.success) {
      console.log("Validation error:", result.error.format());
      throw new AppError("Invalid request body", 400);
    }
  };

import { FastifyReply, FastifyRequest } from "fastify";
import { ZodSchema } from "zod";
import { HttpStatus } from "../constants/httpStatus";
import { sendReply } from "../utils/SendReply";

export const validateBodyHook =
  (schema: ZodSchema) =>
  async (request: FastifyRequest, reply: FastifyReply) => {
    const body = request.body;
    const result = schema.safeParse(body);
    if (!result.success) {
      sendReply(
        reply,
        HttpStatus.UNPROCESSABLE_ENTITY,
        false,
        "Validation failed",
        result.error?.issues?.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      );
      return;
    }
  };

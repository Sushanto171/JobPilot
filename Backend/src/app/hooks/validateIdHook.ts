import { onRequestHookHandler } from "fastify";
import { AppError } from "../utils/AppError";

export const validateIdHook: onRequestHookHandler = async (request, reply) => {
  const { id } = request.params as { id?: string };

  if (!id || id.trim() === "") {
    throw new AppError("Resource ID is required", 400);
  }
};

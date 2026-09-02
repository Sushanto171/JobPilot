import { validateIdHook } from "@/app/hooks/validateIdHook";
import { FastifyInstance } from "fastify";
import { UserController } from "./user.controller";

const userController = new UserController();
export const userRouter = async (fastify: FastifyInstance) => {
  fastify.get("/", userController.getUsers);
  fastify.get(
    "/:id",
    { onRequest: [validateIdHook] },
    userController.getUserById,
  );
};

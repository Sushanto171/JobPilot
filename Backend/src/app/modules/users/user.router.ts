import { validateBodyHook } from "@/app/hooks/validateBodyHook";
import { validateIdHook } from "@/app/hooks/validateIdHook";
import { FastifyInstance } from "fastify";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";

const userValidation = new UserValidation();

const userController = new UserController();
export const userRouter = async (fastify: FastifyInstance) => {
  fastify.get("/", userController.getUsers);
  fastify.get(
    "/:id",
    { onRequest: [validateIdHook] },
    userController.getUserById,
  );
  fastify.post(
    "/",
    { preValidation: [validateBodyHook(userValidation.createSchema)] },
    userController.createUser,
  );
};

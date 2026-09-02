import { catchAsync } from "@/app/helpers/catchAsync";
import { CreateUserInput } from "@/app/types";
import { sendReply } from "@/app/utils/SendReply";
import { UserService } from "./user.service";
const userService = new UserService();
export class UserController {
  getUsers = catchAsync(async (request, reply) => {
    const users = await userService.getUsers();
    sendReply(reply, 200, true, "Users fetched successfully", users);
  });

  getUserById = catchAsync(async (request, reply) => {
    const { id } = request.params as { id: string };
    const user = await userService.getUserById(id);
    sendReply(reply, 200, true, "User fetched successfully", user);
  });

  createUser = catchAsync(async (request, reply) => {
    const body = request.body;
    const result = await userService.createUser(body as CreateUserInput);
    sendReply(reply, 201, true, "User created successfully", result);
  });
}

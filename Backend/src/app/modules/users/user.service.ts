import { fastify } from "@/app";
import { CreateUserInput } from "@/app/types";

export class UserService {
  async getUsers() {
    fastify.log.info("Fetching all users");
    const users = await fastify.prisma.User.all();
    return users;
  }

  async getUserById(id: string) {
    fastify.log.info(`Fetching user with ID: ${id}`);
    const user = await fastify.prisma.User.first({ id });
    return user;
  }

  async createUser(data: CreateUserInput) {
    fastify.log.info("Creating a new user");
    const newUser = await fastify.prisma.User.create(data);
    return newUser;
  }

  async updateUser(id: string, data: any) {
    fastify.log.info(`Updating user with ID: ${id}`);
    const updatedUser = await fastify.prisma.User.where({ id }).update(data);
    return updatedUser;
  }

  async deleteUser(id: string) {
    fastify.log.info(`Deleting user with ID: ${id}`);
    const deletedUser = await fastify.prisma.User.where({ id }).delete();
    return deletedUser;
  }
}

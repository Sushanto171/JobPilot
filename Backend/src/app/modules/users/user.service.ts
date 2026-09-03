import { fastify } from "@/app";
import { BcryptHelper } from "@/app/helpers/bcrypt";
import { AppError } from "@/app/utils/AppError";
import { CreateUserInput } from "./user.validation";

export class UserService {
  async getUsers(cursor?: any, limit: number = 10) {
    fastify.log.info("Fetching all users");
    const usersPromise = fastify.prisma.User.select(
      "id",
      "name",
      "email",
      "username",
    )
      .limit(limit)
      .orderBy((u) => u.createdAt.desc())
      .cursor({ id: cursor })
      .all();
    const totalUserPromise = fastify.prisma.User.aggregate((u) => ({
      totalUser: u.count(),
    }));

    const [users, { totalUser }] = await Promise.all([
      usersPromise,
      totalUserPromise,
    ]);

    return {
      users,
      nextCursor:
        users.length === limit ? (users[users.length - 1]?.id ?? null) : null,
      limit,
      totalUser,
    };
  }

  async getUserById(id: string) {
    fastify.log.info(`Fetching user with ID: ${id}`);
    const user = await fastify.prisma.User.select(
      "id",
      "name",
      "email",
      "username",
    ).first({ id });
    return user;
  }

  generateUniqueUsername = async (fullname: string): Promise<string> => {
    const sanitizedFullname = fullname
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .trim();
    const baseUsername = sanitizedFullname || "user";
    let username = baseUsername;
    let counter = 1;

    while (await fastify.prisma.User.first({ username })) {
      username = `${baseUsername}${counter}`;
      counter++;
    }

    return username;
  };

  async createUser(data: CreateUserInput) {
    fastify.log.info("Creating a new user");
    // Retry mechanism to handle unique constraint violations
    const maxRetries = 5;
    let attempts = 0;
    while (attempts < maxRetries) {
      try {
        let username = await this.generateUniqueUsername(data.name);
        data.password = await BcryptHelper.hashPassword(data.password);
        const newUser = await fastify.prisma.User.select(
          "id",
          "name",
          "email",
          "username",
        ).create({ ...data, username });
        return newUser;
      } catch (error: any) {
        if (
          error.code === "P2002" &&
          error.meta?.target?.includes("username")
        ) {
          attempts++;
          if (attempts >= maxRetries) {
            throw new AppError(
              `Maximum retries exceeded for creating user`,
              500,
            );
          }
          fastify.log.warn(
            `Unique constraint violation for username. Retrying... Attempt ${attempts}`,
          );
          continue;
        } else {
          throw new AppError(`Error creating user: ${error.message}`, 500);
        }
      }
    }
  }

  async createUserWithoutRetry(data: CreateUserInput) {
    fastify.log.info("Creating a new user without retry");
    const username = await this.generateUniqueUsername(data.name);
    const newUser = await fastify.prisma.User.create({ ...data, username });
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

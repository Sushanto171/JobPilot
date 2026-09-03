import { fastify } from "@/app";

export type UserRecord = NonNullable<
  Awaited<ReturnType<typeof fastify.prisma.User.first>>
>;
export type ContractRole = UserRecord["role"];

// export type CreateUserInput = Pick<UserRecord, "email" | "name">;

// export type UpdateUserInput = Omit<
//   UserRecord,
//   "id" | "updatedAt" | "createdAt" | "role"
// >;

import { fastify } from "@/app";

export type UserRecord = NonNullable<
  Awaited<ReturnType<typeof fastify.prisma.User.first>>
>;
export type ContractRole = UserRecord["role"];

import { prisma } from "@/prisma/db";

export type UserRecord = NonNullable<
  Awaited<ReturnType<typeof prisma.User.first>>
>;
export type ContractRole = UserRecord["role"];

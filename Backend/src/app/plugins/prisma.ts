import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import postgres from "@prisma/orm-postgres/runtime";
import type { Contract } from "@/prisma/contract.d";
import { db } from "@/prisma/db";

type Prisma8Client = ReturnType<typeof postgres<Contract>>["orm"]["public"];
declare module "fastify" {
   interface FastifyInstance {
    prisma: Prisma8Client;
    db: typeof db;
  }
}

const prismaPlugin: FastifyPluginAsync = async (fastify, options) => {

  const prisma = db.orm.public;

  fastify.decorate("db", db);

  fastify.decorate("prisma", prisma);

};

export default fp(prismaPlugin);

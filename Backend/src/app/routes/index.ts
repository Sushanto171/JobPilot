import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { authRouter } from "../modules/auth/auth.router";
import { userRouter } from "../modules/users/user.router";

interface RouteConfig {
  prefix: string;
  plugin: FastifyPluginAsync;
}

export const routes = (fastify: FastifyInstance) => {
  const routeConfigs: RouteConfig[] = [
    {
      prefix: "/auth",
      plugin: authRouter,
    },
    {
      prefix: "/users",
      plugin: userRouter,
    },
  ];

  routeConfigs.forEach((config) => {
    fastify.register(config.plugin, { prefix: config.prefix });
  });
};

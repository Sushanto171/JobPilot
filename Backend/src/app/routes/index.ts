import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { userRouter } from "../modules/users/user.router";

interface RouteConfig {
  prefix: string;
  plugin: FastifyPluginAsync;
}

export const routes = (fastify: FastifyInstance) => {
  const routeConfigs: RouteConfig[] = [
    {
      prefix: "/users",
      plugin: userRouter,
    },
  ];

  routeConfigs.forEach((config) => {
    fastify.register(config.plugin, { prefix: config.prefix });
  });
};

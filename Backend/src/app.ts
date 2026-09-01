import Fastify from "fastify";
import { sendReply } from "./app/utils/SendReply";
export const fastify = Fastify({ logger: true });

fastify.get("/", (request, reply) => {
  sendReply(reply, 200, true, "Server is running..");
});

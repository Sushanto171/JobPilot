import fastify from "fastify";
import { sendReply } from "./app/utils/SendReply";
export const app = fastify({ logger: true });

app.get("/", (request, reply) => {
  sendReply(reply, 200, true, "Server is running..");
});

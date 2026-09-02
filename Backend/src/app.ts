import Fastify from "fastify";
import { sendReply } from "./app/utils/SendReply";
import { globalErrorHandler } from "./app/helpers/globalError";
import { catchAsync } from "./app/helpers/catchAsync";
export const fastify = Fastify({ logger: true });

fastify.get("/", (request, reply) => {
  sendReply(reply, 200, true, "Server is running..");
});

fastify.get("/health", catchAsync(async (request, reply) => {
  const start =  Date.now();
  const plan = fastify.db.sql.public.user
    .select("serverNow", (f, fns) => fns.raw`now()`.returns("pg/timestamptz@1"))
    .limit(1)
    .build();

  await fastify.db.runtime().execute(plan);
  sendReply(reply, 200, true, "Server is running..", {
    healthy: true,
    latencyMs: Date.now() - start,
  });
}))



fastify.setErrorHandler(globalErrorHandler);
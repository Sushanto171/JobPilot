import { FastifyReply, FastifyRequest } from "fastify";

type AsyncFunction = (request: FastifyRequest, reply: FastifyReply) => Promise<void>;

export const catchAsync = (fn: AsyncFunction)=>(request: FastifyRequest, reply: FastifyReply) => Promise.resolve(fn(request, reply)).catch((err) =>{throw err})
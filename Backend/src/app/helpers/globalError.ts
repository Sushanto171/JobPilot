import  { FastifyReply, FastifyRequest } from "fastify";
import { sendReply } from "../utils/SendReply";
import { fastify } from "@/app";

export const globalErrorHandler = (err: any, req: FastifyRequest, reply: FastifyReply) => {
  console.log(" 🐛️ ", err);

  fastify.log.error(err)
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  sendReply(reply,statusCode,false,message)
}
import { FastifyReply } from "fastify";

type SendReplyResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};

type SendReplyFunction = <T>(
  reply: FastifyReply,
  statusCode: number,
  success: boolean,
  message: string,
  data?: T,
) => void;

export const sendReply: SendReplyFunction = <T>(
  reply: FastifyReply,
  statusCode: number,
  success: boolean,
  message: string,
  data?: T,
) => {
  const response: SendReplyResponse<T> = {
    success,
    message,
  };

  if (data) {
    response.data = data;
  }
  reply.status(statusCode).send(response);
};

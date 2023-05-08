import { FastifyReply } from 'fastify';
import { StatusCodeAndMessage, SuccessTypes, ErrorTypes } from './error_handler';
export const succeessResponseHandler = (reply: FastifyReply, data: any, type: SuccessTypes = SuccessTypes.SUCCESS, message?: string) => {
  const statusCode = StatusCodeAndMessage[type].statusCode;
  reply.code(statusCode).send({
    data,
    message: message ?? StatusCodeAndMessage[type].message,
    statusCode
  });
};
export const errorResponseHandler = (reply: FastifyReply, error: any) => {
  const statusCode = error.statusCode ?? error.code ?? StatusCodeAndMessage[ErrorTypes.INTERNAL_SERVER_ERROR].statusCode;
  reply.code(statusCode).send({
    message: error.message ?? StatusCodeAndMessage[ErrorTypes.INTERNAL_SERVER_ERROR].message,
    statusCode
  });
};

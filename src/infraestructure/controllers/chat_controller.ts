import { FastifyReply, FastifyRequest } from "fastify";
import { Server } from "socket.io";
import { CreateChatSessionInput, CreateChatSessionUseCase } from "../../application/usecases/chat/create_chat_session_usecase";
import { CreateMessageUseCase } from "../../application/usecases/message/create_message_usecase";
import { Message } from "../../domain/entities/chat";
import { errorResponseHandler, succeessResponseHandler } from "../../shared/utils/controller_response_handler";
import { SuccessTypes } from "../../shared/utils/error_handler";
import { Logger } from "../logger/logger";

export class ChatController {
  constructor(
    private readonly createChatSessionUseCase: CreateChatSessionUseCase,
    private readonly createMessageUseCase: CreateMessageUseCase,
  ) {

  }
  async create(request: FastifyRequest, reply: FastifyReply): Promise<any> {
    try {
      const newChatSession = request.body as CreateChatSessionInput;
      const result = await this.createChatSessionUseCase.execute(newChatSession);
      succeessResponseHandler(reply, result, SuccessTypes.CREATED, 'chat session created successfully');
    } catch (error) {
      Logger.error(error, this.constructor.name);
      errorResponseHandler(reply, error);
    }
  }
  async insertMessage(request: FastifyRequest, reply: FastifyReply,socket: Server): Promise<any> {
    try {
      const chatId = request.params['chatId'];
      const message = request.body as Message;
      const result = await this.createMessageUseCase.execute({ chatId, message })
      // send message to socket
      this.createMessageUseCase.on('personToBot', (message) => {
        socket.to(chatId).emit('receiveMessage', message);
      })
      succeessResponseHandler(reply, result, SuccessTypes.CREATED, 'message inserted successfully');
    } catch (error) {
      Logger.error(error, this.constructor.name);
      errorResponseHandler(reply, error);
    }
  }

  async getAll(_request: FastifyRequest, reply: FastifyReply): Promise<any> {
    try {
      const result = await this.createChatSessionUseCase.getAll();
      succeessResponseHandler(reply, result, SuccessTypes.SUCCESS, 'chats retrieved successfully');
    } catch (error) {
      Logger.error(error, this.constructor.name);
      errorResponseHandler(reply, error);
    }
  }
}
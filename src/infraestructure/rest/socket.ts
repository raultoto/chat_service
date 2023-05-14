import { FastifyInstance } from 'fastify';
import { Server } from 'socket.io';
import { Logger } from '../logger/logger';

export class SocketIoServer {
  public io: Server;

  constructor(fastify: FastifyInstance) {
    this.io = fastify.io;
    this.io.on("connection", (socket) => {
      Logger.info(`Client connected: ${socket.id}`, '');

      socket.on('joinChat', (chatId) => {
        socket.join(chatId);
        Logger.info(`User joined chat: ${chatId}`, '');
      });

      socket.on('leaveChat', (chatId) => {
        socket.leave(chatId.chatId);
        Logger.info(`User left chat: ${chatId}`, '');
      });

      socket.on('sendMessage', (chatId, message) => {
        socket.to(chatId).emit('receiveMessage', message);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });
  }
}

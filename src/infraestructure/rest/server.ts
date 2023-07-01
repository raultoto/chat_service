import { FastifyInstance } from 'fastify';
import { Logger } from '../logger/logger';
import { routes } from './routes';
import { swagger } from './swagger';
/**
 * This is a TypeScript function that sets up a WebSocket server using Fastify and handles various
 * socket events such as joining/leaving a chat, sending messages, and disconnecting.
 * @param {FastifyInstance} fastify - `fastify` is an instance of the Fastify web framework, which is
 * used to create the WebSocket server. It is passed as a parameter to the `wsServer` function.
 */
const wsServer = async (fastify: FastifyInstance) => {
  fastify.io.on("connection", (socket) => {
    Logger.info(`Client connected: ${socket.id}`,'');
    socket.on('joinChat', (chatId) => {
      const topic = `chat-${chatId}`;
      socket.join(topic);
      Logger.info(`Client joined to chat: ${chatId}`,'');
    });

    socket.on('leaveChat', (chatId) => {
      const topic = `chat-${chatId}`;
      socket.leave(topic);
      Logger.info(`Client left chat: ${chatId}`,'');
    });

    socket.on('sendMessage', (chatId, message) => {
      const topic = `chat-${chatId}`;
      Logger.info(`Client sent message to chat: ${chatId}`,'');
      socket.to(topic).emit(topic, { chatId, message });
    });

    socket.on('sendBotMessage', (chatId, message) => {
      const topic = `chat-${chatId}`;
      Logger.info(`Client sent bot message to chat: ${chatId}`,'');
      socket.to(topic).emit(topic, { chatId, message });
    });

    // Add other events (updateMessage, deleteMessage, addResource, updateResource, deleteResource)

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  })
}

/**
 * It registers the Swagger plugin, registers the routes, and starts the server
 * @param {FastifyInstance} fastify - FastifyInstance: The Fastify instance.
 * @returns A function that returns a promise.
 */
export const httpServer = async (fastify: FastifyInstance) => {
  await swagger(fastify);
  await routes(fastify);
  await wsServer(fastify);
  
  /* Listening to the port and host defined in the .env file. */
  fastify.listen({ port: Number(process.env.PORT), host: process.env.HOST }, (err, addr) => {
    Logger.info(`HTTP server listening on ${addr}`, 'Fastify');
    fastify.swagger();
    if (err) {
      Logger.error(err, 'Fastify');
      process.exit(1);
    }
  });
  return fastify;
};

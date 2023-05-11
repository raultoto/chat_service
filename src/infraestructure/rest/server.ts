import { FastifyInstance } from 'fastify';
import container from '../../bootstrap/iocContainer';
import { Logger } from '../logger/logger';

/**
 * It registers the Swagger plugin, registers the routes, and starts the server
 * @param {FastifyInstance} fastify - FastifyInstance: The Fastify instance.
 * @returns A function that returns a promise.
 */
export const httpServer = async (fastify: FastifyInstance) => {
  await fastify.register(require('@fastify/swagger'), {
    mode: 'static',
    specification: {
      path: 'src/infraestructure/rest/schema.json'
    },
    exposeRoute: true,
    routePrefix: 'docs'
  });
  /* Registering the user routes. */
  fastify.get('/user', async (request, reply) => container.UserController.getAll(request, reply));
  fastify.post('/user', async (request, reply) => container.UserController.create(request, reply));
  fastify.put('/user/:id', async (request, reply) => container.UserController.update(request, reply));
  fastify.get('/user/:id', async (request, reply) => container.UserController.get(request, reply));
  fastify.delete('/user/:id', async (request, reply) => container.UserController.delete(request, reply));

  fastify.post('/chat', async (request, reply) => container.ChatController.create(request, reply));
  fastify.post('/chat/:chatId/message', async (request, reply) => container.ChatController.insertMessage(request, reply, fastify));
  fastify.get('/chats', async (request, reply) => container.ChatController.getAll(request, reply));

  fastify.io.on("connection", (socket) => {
    Logger.info(`Client connected: ${socket.id}`,'');
    socket.on('joinChat', (chatId) => {
      socket.join(chatId);
      Logger.info(`User joined chat: ${chatId}`,'');
    });

    socket.on('leaveChat', (chatId) => {
      socket.leave(chatId.chatId);
      Logger.info(`User left chat: ${chatId}`,'');
    });

    socket.on('sendMessage', (chatId, message) => {
      socket.to(chatId).emit('receiveMessage', message);
    });

    // Add other events (updateMessage, deleteMessage, addResource, updateResource, deleteResource)

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  })
  /* Listening to the port and host defined in the .env file. */
  fastify.listen({ port: Number(process.env.PORT), host: process.env.HOST }, (err, addr) => {
    Logger.info(`HTTP server listening on ${addr}`, 'Fastify');
    if (err) {
      Logger.error(err, 'Fastify');
      process.exit(1);
    }
  });
  return fastify;
};

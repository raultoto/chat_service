import { FastifyInstance } from 'fastify';
import container from '../../../bootstrap/iocContainer';
import { SocketIoServer } from '../socket';

export const chats = async (fastify: FastifyInstance) => {
  const socketServer = new SocketIoServer(fastify);

  const getChatsOpts = {
    schema: {
      tags: ['chats'],
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            statusCode: { type: 'number' },
            data: {
              type: 'array',
              items: {
                $ref: 'chatSchema#',
              },
            },
          }
        }
      }
    }
  };
  fastify.get('', getChatsOpts, async (request, reply) => container.ChatController.getAll(request, reply));
  const optsChatPost = {
    schema: {
      tags: ['chats'],
      body: { $ref: 'chatSchema#' },
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            statusCode: { type: 'number' },
            data: { $ref: 'chatSchema#' },
          }
        }
      }
    }
  };
  fastify.post('', optsChatPost, async (request, reply) => container.ChatController.create(request, reply));

  fastify.post('/chat/:chatId/message', async (request, reply) => container.ChatController.insertMessage(request, reply, socketServer.io));
};

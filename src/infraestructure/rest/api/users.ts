import { FastifyInstance } from 'fastify';
import container from '../../../bootstrap/iocContainer';

export const users = async (fastify: FastifyInstance) => {
  const getUsersOpts = {
    schema: {
      tags: ['users'],
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            statusCode: { type: 'number' },
            data: {
              type: 'array',
              items: {
                $ref: 'userSchema#',
              },
            },
          }
        }
      }
    }
  };
  fastify.get('', getUsersOpts, async (request, reply) => container.UserController.getAll(request, reply));
  const optsUserPost = {
    schema: {
      tags: ['users'],
      body: { $ref: 'userSchema#' },
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            statusCode: { type: 'number' },
            data: { $ref: 'userSchema#' },
          }
        }
      }
    }
  };
  fastify.post('', optsUserPost, async (request, reply) => container.UserController.create(request, reply));

  fastify.put('/user/:id', async (request, reply) => container.UserController.update(request, reply));
  fastify.get('/user/:id', async (request, reply) => container.UserController.get(request, reply));
  fastify.delete('/user/:id', async (request, reply) => container.UserController.delete(request, reply));


}
import { FastifyInstance } from 'fastify';
import { users } from './api/users';
import{ chats } from './api/chats';

export const routes = async (fastify: FastifyInstance) => {
  /* Registering the user routes. */
  await fastify.register(users, { prefix: '/users' });
  await fastify.register(chats, { prefix: '/chats' });
}
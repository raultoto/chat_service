import { FastifyInstance } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi, { FastifySwaggerUiOptions } from '@fastify/swagger-ui';
import { personSchema, userSchema, chatSchema } from '../schema/models';
import { EmailSchema, PhoneNumberSchema, paginationSchema, paramIdSchema } from '../schema/commons';

/**
 * This function sets up and registers Swagger UI with Fastify for API documentation.
 * @param {FastifyInstance} fastify - The `fastify` parameter is an instance of the Fastify server. It
 * is used to register the `fastify-swagger` and `fastify-swagger-ui` plugins and configure their
 * options.
 */
export const swagger = async (fastify: FastifyInstance) => {

  const optsOpenApi = {
    openapi: {
      openapi: '3.0.3',
      info: {
        title: 'Test swagger',
        description: 'Testing the Fastify swagger API',
        version: '0.1.0'
      },
      servers: [
        { url: `http://localhost:${process.env.PORT}`, description: 'development' },
        { url: `http://${process.env.HOST}:${process.env.PORT}`, description: 'production' },
      ],
    },
    stripBasePath: true,
    exposeRoute: true,
    routePrefix: '/docs/json',
  };
  await fastify.register(fastifySwagger, optsOpenApi);
  const optsSwaggerUi: FastifySwaggerUiOptions = {
    baseDir: __dirname,
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (document) => document,
  };
  await fastify.register(fastifySwaggerUi, optsSwaggerUi);
  fastify.addSchema(EmailSchema);
  fastify.addSchema(PhoneNumberSchema);
  fastify.addSchema(paginationSchema);
  fastify.addSchema(paramIdSchema);

  fastify.addSchema(personSchema);
  fastify.addSchema(userSchema);
  fastify.addSchema(chatSchema);
};
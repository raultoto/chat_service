import Fastify from 'fastify';
import { Settings } from 'luxon';
import { config } from './bootstrap/config';
import { createContainer } from './bootstrap/iocContainer';
import { Logger, transportDefinition } from './infraestructure/logger/logger';
import { MongoConnectionManager } from './infraestructure/mongo/mongo_connection_manager';
import { httpServer } from './infraestructure/rest/server';
import fastifyWs from "fastify-socket.io";
/**
 * It creates a new instance of the MongoConnectionManager class, which is responsible for connecting
 * to the database, and then it creates a new instance of the Fastify class, which is responsible for
 * creating the HTTP server
 */
async function run() {
  captureUnHandledException();
  Settings.defaultZone = 'America/lima';
  const db = await (new MongoConnectionManager(config.db.url, config.db.name)).getDb();
  const server = Fastify({
    logger: transportDefinition
  });
  server.register(fastifyWs)
  createContainer({ database: db });
  httpServer(server);
}
/**
 * It captures unhandled exceptions and logs them
 */
const captureUnHandledException = () => {
  process.on('unhandledRejection', (error) => {
    Logger.error(error, 'unhandledRejection');
  });
  process.on('uncaughtException', (error) => {
    Logger.error(error, 'uncaughtException');
  });
};

run();

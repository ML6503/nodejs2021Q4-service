import path from 'path';
// const fastify = require('fastify')({ logger: true });
import fastify, { FastifyInstance } from 'fastify';
import fastifySwagger from 'fastify-swagger';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { config } from './common/config';
import { boardsRoutes } from './resources/boards/board.router';
import { tasksRoutes } from './resources/tasks/task.router';
import { usersRoutes } from './resources/users/user.router';

/**
 * const server get assigned with a Fastify factory function for the standard fastify http, https, or http2 server instance.

The default function utilizes http

@param opts — Fastify server options

@returns — Fastify server instance
 */
const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  fastify();

  /**
   * register async function get server register with Fastify plugins
   * @remarks
   * FastifyPluginCallback<SwaggerOptions> - ready api.yaml documentation
   * and with app routes as FastifyInstance
   * userRoutes
   * boardRoutes
   * tasksRoutes
   *
   */

const register = async () => {
  await server.register(fastifySwagger, {
    exposeRoute: true,
    routePrefix: '/doc',
    mode: 'static',
    specification: {
      path: path.join(__dirname, '../doc/api.yaml'),
      baseDir: __dirname,
    },
  });

  await server.register(usersRoutes);

  await server.register(boardsRoutes);

  await server.register(tasksRoutes);
};
/**
 * Async Promiselike function to start Fastify server
 * that try server to connect if error then process.exit code = 1
 * and catch Error if any with server log error and process exit = 1
 * 
 */
const start: () => Promise<void> = async () => {
  try {
    await register();
    server.listen(config.PORT, (err: Error | unknown, address: string) => {
      if (err) {
        if (err instanceof Error) {
          console.error(err);
          process.exit(1);
        }
      }
      console.log(`Server listening at ${address}`);
    });
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      server.log.error(error);
      process.exit(1);
    }
  }
};

process.on('uncaughtException', (error: Error) => console.error(error));
process.on(
  'unhandledRejection',
  (error: Error | unknown) => error instanceof Error && console.error(error)
);

start();

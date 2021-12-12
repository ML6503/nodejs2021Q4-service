import path from 'path';
// const fastify = require('fastify')({ logger: true });
import fastify, { FastifyInstance } from 'fastify';
import fastifySwagger from 'fastify-swagger';
import { config } from './common/config';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { boardsRoutes } from './resources/boards/board.router';
import { tasksRoutes } from './resources/tasks/task.router';
import { usersRoutes } from './resources/users/user.router';

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  fastify();
console.log('path', path.join(__dirname, '../doc/api.yaml'));
server.register(fastifySwagger, {
  exposeRoute: true,
  routePrefix: '/doc',
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml'),
    baseDir: __dirname,
  },
});

server.register(usersRoutes);

server.register(boardsRoutes);

server.register(tasksRoutes);

const start: () => void = () => {
  try {
    server.listen(config.PORT, (err: Error | unknown, address: string) => {
      if (err) {
        err instanceof Error && console.error(err);
        process.exit(1);
      }
      console.log(`Server listening at ${address}`);
    });
  } catch (error: Error | unknown) {
    error instanceof Error && server.log.error(error);
    process.exit(1);
  }
};

process.on('uncaughtException', (error: Error) => console.error(error));
process.on(
  'unhandledRejection',
  (error: Error | unknown) => error instanceof Error && console.error(error)
);

start();

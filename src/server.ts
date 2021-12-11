import * as path from 'path';
// const fastify = require('fastify')({ logger: true });
import fastify, { FastifyInstance } from 'fastify';
import fastifySwagger  from "fastify-swagger";
import { config } from './common/config';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { boardsRoutes } from './resources/boards/board.router';

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify();

server.register(fastifySwagger, {
  exposeRoute: true,
  routePrefix: '/doc',
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml'),
    baseDir: '../doc'
  },
});

server.register(require('./resources/users/user.router'));

server.register(boardsRoutes);

server.register(require('./resources/tasks/task.router'));

const start: () => void  = () => {
  try {
    server.listen(config.PORT, (err: Error | null, address: string) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server listening at ${address}`);
    });
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

process.on('uncaughtException', error => console.error(error));
process.on('unhandledRejection', error => console.error(error));

start();

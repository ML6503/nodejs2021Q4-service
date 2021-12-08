// const path = require('path');
import * as path from 'path';
// const fastify = require('fastify')({ logger: true });
const fastify = require('fastify')();
// import { PORT } from './common/config';
import { config } from './common/config';

fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/doc',
  swagger: {
    info: {
      title: 'fastify REST Service',
      description: 'Testing the Fastify swagger API',
    },
  },
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml'),
  },
});

fastify.register(require('./resources/users/user.router'));

fastify.register(require('./resources/boards/board.router'));

fastify.register(require('./resources/tasks/task.router'));

const start = async (): Promise<void> => {
  try {
    await fastify.listen(config.PORT, (err: Error, address: string) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server listening at ${address}`);
    });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();

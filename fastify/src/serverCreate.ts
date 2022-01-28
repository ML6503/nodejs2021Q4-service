import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import 'reflect-metadata';
import fastify, { FastifyInstance } from 'fastify';
import fastifySwagger from 'fastify-swagger';
import fpJWT from './auth/fpJWT';
import { boardsRoutes } from './resources/boards/board.router';
import { tasksRoutes } from './resources/tasks/task.router';
import { usersRoutes } from './resources/users/user.router';
import { customLogger } from './customLogger';
import { loginRoute } from './resources/login/login.router';

/**
 * const server get assigned with a Fastify factory function for the standard fastify http, https, or http2 server instance.
 * The default function utilizes http
 * @returns — Fastify server instance
 */
const server: FastifyInstance = fastify({
  genReqId: () => uuidv4(),
  logger: customLogger,
  disableRequestLogging: true,
});

server.addHook('onRequest', (req, _reply, done) => {
  req.log.info(
    {
      method: req.method,
      url: req.raw.url,
      parameters: req.params,
      id: req.id as 'string',
    },
    'received request'
  );

  done();
});

server.addHook('onResponse', (req, reply, done) => {
  req.log.info(
    {
      url: req.raw.url,
      statusCode: reply.raw.statusCode,
    },
    'request completed'
  );
  done();
});

/**
 * library logger hook to add body to request log
 */
server.addHook('preHandler', (req, _reply, next) => {
  if (req.body) {
    req.log.info({ body: req.body }, 'parsed body');
  }
  next();
});
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

void (async () => {
  await server.register(fastifySwagger, {
    exposeRoute: true,
    routePrefix: '/doc',
    mode: 'static',
    specification: {
      path: path.join(__dirname, '../doc/api.yaml'),
      baseDir: __dirname,
    },
  });

  await server.register(fpJWT);

  await server.register(loginRoute);

  await server.register(usersRoutes);

  await server.register(boardsRoutes);

  await server.register(tasksRoutes);
})();

process.on('uncaughtException', (error: Error) => server.log.error(error));

process.on(
  'unhandledRejection',
  (error: Error | unknown) => error instanceof Error && server.log.error(error)
);

export default server;

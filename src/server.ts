import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import 'reflect-metadata';
import fastify, { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fastifySwagger from 'fastify-swagger';
import { boardsRoutes } from './resources/boards/board.router';
import { tasksRoutes } from './resources/tasks/task.router';
import { usersRoutes } from './resources/users/user.router';
import { customLogger } from './customLogger';
import { config } from './common/config';
import fp from './plugin/db';

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
      url: req.raw.url, // add url to response as well for simple correlating
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

  await server.register(fp as FastifyPluginAsync);

  await server.register(usersRoutes);

  await server.register(boardsRoutes);

  await server.register(tasksRoutes);
};
/**
 * starts Fastify server
 * that try server to connect if error then process.exit code = 1
 * and catch Error if any with server log error and process exit = 1
 *
 */
const start = async () => {
  await register();

  try {
    server.listen(
      config.PORT,
      '0.0.0.0',
      (err: Error | unknown, address: string) => {
        if (err) {
          if (err instanceof Error) {
            server.log.error(err);
            process.exit(1);
          }
        }
        server.log.info(
          `Server listening at port ${config.PORT} at ${address}`
        );
        // console.log(`Server listening at ${address}`);
      }
    );
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      server.log.error(error);
      process.exit(1);
    }
  }
};

process.on('uncaughtException', (error: Error) => server.log.error(error));
process.on(
  'unhandledRejection',
  (error: Error | unknown) => error instanceof Error && server.log.error(error)
);

void start();

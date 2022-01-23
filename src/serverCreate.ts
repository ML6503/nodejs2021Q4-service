import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import 'reflect-metadata';
import fastify, { FastifyInstance } from 'fastify';
import fastifySwagger from 'fastify-swagger';
// import fastifyJwt from 'fastify-jwt';
import fpJWT from './auth/fpJWT';
import { boardsRoutes } from './resources/boards/board.router';
import { tasksRoutes } from './resources/tasks/task.router';
import { usersRoutes } from './resources/users/user.router';
import { customLogger } from './customLogger';
import { loginRoute } from './resources/login/login.router';

// const SECRET_KEY = 'supersecret';

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

  // await server.register(fastifyJwt, {
  //   secret: SECRET_KEY,
  // });

  await server.register(fpJWT);

  await server.register(loginRoute);

  await server.register(usersRoutes);

  await server.register(boardsRoutes);

  await server.register(tasksRoutes);
})();

server.addHook('onRequest', async (request, reply) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    await reply.send(err);
  }
});

server.setErrorHandler((error, _request, reply): void => {
  if (error.statusCode && error.statusCode >= 500) {
    void reply.status(error.statusCode).send(error.message);
    server.log.error(error);
  }
  if (error.validation) {
    server.log.info(error);
    void reply.status(400).send(error);
  } else {
    server.log.error(error);
    void reply.status(500).send({ ok: false });
  }
});

process.on('uncaughtException', (error: Error) => server.log.error(error));

process.on(
  'unhandledRejection',
  (error: Error | unknown) => error instanceof Error && server.log.error(error)
);

export default server;

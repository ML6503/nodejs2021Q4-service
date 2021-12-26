import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fastify, {
  FastifyInstance,
  FastifyRequest,
  RawServerBase,
} from 'fastify';
import fastifySwagger from 'fastify-swagger';

import { RouteGenericInterface } from 'fastify/types/route';
import { IncomingMessage } from 'http';
import { Http2ServerRequest } from 'http2';
import { boardsRoutes } from './resources/boards/board.router';
import { tasksRoutes } from './resources/tasks/task.router';
import { usersRoutes } from './resources/users/user.router';
import customLogger from './utils/customLogger';
import { config } from './common/config';
import { DBError } from './utils/DBError';

/**
 * const server get assigned with a Fastify factory function for the standard fastify http, https, or http2 server instance.
 * The default function utilizes http
 * @returns — Fastify server instance
 */
const server: FastifyInstance = fastify({
  genReqId: () => uuidv4(),
  logger: customLogger,
  // disableRequestLogging: true,
});

/**
 * fastify library logger hook to add method, url, query parameters and id  to request log
 */
interface FastifyHookProps {
  method: string;
  url: string;
  parameters: unknown;
  id: string;
}

server.addHook(
  'onRequest',
  (
    req: FastifyRequest<
      RouteGenericInterface,
      RawServerBase,
      IncomingMessage | Http2ServerRequest,
      unknown
    >,
    _reply,
    done
  ) => {
    req.log.info(
      {
        method: req.method,
        url: req.raw.url as string,
        parameters: req.params,
        id: req.id as string,
      } as FastifyHookProps,
      'received request'
    );

    done();
  }
);

/**
 * fastify library logger hook to add url and status code  to request log
 */
server.addHook(
  'onResponse',
  (
    req,
    reply: FastifyReply<
      RawServerBase,
      IncomingMessage,
      ServerResponse | Http2ServerResponse,
      RouteGenericInterface,
      unknown
    >,
    done
  ) => {
    req.log.info(
      {
        url: req.raw.url, // add url to response as well for simple correlating
        statusCode: reply.raw.statusCode,
      },
      'request completed'
    );
    done();
  }
);

/**
 * fastify library logger hook to add body to request log
 */
server.addHook('preHandler', (req, _reply, next) => {
  if (req.body) {
    req.log.info({ body: req.body }, 'parsed body');
  }
  next();
});

/**
 * fastify library handler that is bound to the Fastify instance
 */
server.setErrorHandler(async (err, req, res) => {
  req.log.warn(err);

  if (!res.sent) {
    if (err instanceof DBError) {
      await res.status(err.statusCode).send(err.message);
    } else if (err.statusCode) {
      await res
        .status(err.statusCode)
        .send(new DBError(err.statusCode, err.message));
    } else {
      await res.status(500).send('Internal Server Error.');
    }
  }
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
    server.listen(config.PORT, (err: Error | unknown, address: string) => {
      if (err) {
        if (err instanceof Error) {
          server.log.error(err);
          process.exit(1);
        }
      }
      server.log.info(`Server listening at ${address}`);
    });
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      server.log.error(error);
      process.exit(1);
    }
  }
};

process.on('uncaughtException', (error: Error) => {
  server.log.error(error);

  process.exit(1);
});

process.on('unhandledRejection', (error: Error | unknown) => {
  if (error instanceof Error) server.log.error(error);

  process.exit(1);
});

void start();

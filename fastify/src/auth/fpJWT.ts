import fp from 'fastify-plugin';
import jwt from 'fastify-jwt';
import { FastifyReply, FastifyRequest } from 'fastify';
import { config } from '../common/config';

const authrRutes = ['boards', 'users', 'tasks'];

// const isAuthorised = (r: string) => AUTH_ROUTES.includes(r);

export default fp(async (fastify, _opts) => {
  await fastify.register(jwt, {
    secret: config.JWT_SECRET_KEY,
  });

  fastify.addHook(
    'preValidation',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const singleRoute = request.url.split('/');

      try {
        if (authrRutes.includes(singleRoute[1])) {
          await request.jwtVerify();
        }
      } catch (err) {
        request.log.error(err, 'Failed to authenticate');
        await reply.status(401).send(err);
      }
    }
  );
  //   fastify.decorate(
  //     'authenticate',
  //     async (request: FastifyRequest, reply: FastifyReply) => {
  //       try {
  //         await request.jwtVerify();
  //       } catch (err) {
  //         request.log.error(err, 'Failed to authenticate');
  //         await reply.status(500).send(err);
  //       }
  //     }
  //   );
});

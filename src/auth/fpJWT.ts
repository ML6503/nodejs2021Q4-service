import fp from 'fastify-plugin';
import jwt from 'fastify-jwt';
import { FastifyReply, FastifyRequest } from 'fastify';
import { config } from '../common/config';

export default fp(async (fastify, _opts) => {
  await fastify.register(jwt, {
    secret: config.JWT_SECRET_KEY,
  });

  fastify.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        request.log.error(err, 'Failed to authenticate');
        await reply.status(500).send(err);
      }
    }
  );
});

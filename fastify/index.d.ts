// import fastify, {
//   FastifyRequest,
//   FastifyReply,
//   FastifyInstance,
// } from 'fastify';
// import { ServerResponse, IncomingMessage, Server } from 'http';

// declare module 'fastify' {
//   export interface FastifyInstance<
//     HttpServer = Server,
//     HttpRequest = IncomingMessage,
//     HttpResponse = ServerResponse
//   > {
//     verifyJWT(): void;
//     authenticate(request: FastifyRequest, reply: FastifyReply): void;
//   }
// }

declare namespace NodeJS {
  interface Process {
    env: { [key: string]: string };
  }
}

declare module 'uuid';

import fp from 'fastify-plugin';
import {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
  FastifyPluginOptions,
} from 'fastify';

import jwt from 'fastify-jwt';

export default fp(
  async (server: FastifyInstance, opts: FastifyPluginOptions) => {
    server.register(jwt, {
      secret: 'secret',
    });
    server.decorate(
      'auth',
      async (request: FastifyRequest, reply: FastifyReply) => {
        try {
          await request.jwtVerify();
        } catch (err) {
          reply.send(err);
        }
      }
    );
  }
);

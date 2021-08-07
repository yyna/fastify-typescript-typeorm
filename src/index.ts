import fastify, {
  FastifyRequest,
  FastifyReply,
  FastifyInstance,
} from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

import db from './decorators/db';
import auth from './middlewares/auth';

import memo from './modules/memo/router';
import user from './modules/user/router';

const PORT = process.env.PORT || '3000';
const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  fastify({ logger: true });

server.register(db);
server.register(auth);

server.register(memo);
server.register(user);

server.setErrorHandler((error, request, reply) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'INTERNAL_SERVER_ERROR';
  reply.code(statusCode).send({
    statusCode,
    message,
  });
});

server.listen(+PORT, '0.0.0.0', (err) => {
  if (err) throw err;
});

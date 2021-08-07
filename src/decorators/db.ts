import fp from 'fastify-plugin';
import { createConnection, getConnectionOptions } from 'typeorm';
import { Memo } from '../modules/memo/entity';
import { User } from '../modules/user/entity';

export default fp(async (fastify) => {
  try {
    const connectionOptions = await getConnectionOptions();
    const connection = await createConnection(connectionOptions);

    fastify.decorate('db', {
      memo: connection.getRepository(Memo),
      user: connection.getRepository(User),
    });
  } catch (error) {
    console.log(error);
  }
});

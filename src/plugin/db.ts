import 'reflect-metadata';
import fp from 'fastify-plugin';
import { createConnection, getConnectionOptions } from 'typeorm';
import { customLogger } from '../customLogger';
import User from '../entity/User';
import Board from '../entity/Board';
import Task from '../entity/Task';

export default fp(async (server) => {
  try {
    // getConnectionOptions will read from ormconfig.js (or .env if that is prefered)
    const connectionOptions = await getConnectionOptions();
    // Object.assign(connectionOptions, {
    //   options: { encrypt: true },
    //   synchronize: true,
    //   // entities: [User, Board, Task],
    //   entities: [`${__dirname}/entity/*.ts`],
    // });

    customLogger.info(`connecting to data base: ${connectionOptions.type}...`);
    const connection = await createConnection(connectionOptions);
    customLogger.debug('db is connected now');

    // this object will be accessible from any fastify server instance
    server.decorate('db', {
      users: connection.getRepository(User),
      boards: connection.getRepository(Board),
      tasks: connection.getRepository(Task),
    });
  } catch (error) {
    customLogger.info(error);
  }
});

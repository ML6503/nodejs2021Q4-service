import path from 'path';

const isCompiled = path.extname(__filename).includes('js');

export default {
  type: 'postgres',
  // host: 'trello-clone-postgres-1',
  host: 'postgres',
  // host: "localhost",
  // host: 'postgres-trello' || 'localhost' || 'trello-clone-postgres-1',
  // name: 'postgres',
  // port: 5432,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER || 'dbuser',
  password: process.env.POSTGRES_PASSWORD || 'dbuser',
  // password: null,
  // database: process.env.POSTGRES_DB || 'trello_clone',
  database: 'trello_clone',
  synchronize: false,
  logging: false,
  migrationsRun: true,
  entities: [`src/entity/**/*.${isCompiled ? 'js' : 'ts'}`],
  migrations: [`src/migration/**/*.${isCompiled ? 'js' : 'ts'}`],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};

import { ConnectionOptions } from 'typeorm';
import path from 'path';

const isCompiled = path.extname(__filename).includes('js');

export default {
  type: 'postgres',
  host: process.env.POSTGRES_PORT || 'localhost',
  port: process.env.POSTGRES_PORT ? Number(process.env.POSTGRES_PORT) : 5432,
  username: process.env.POSTGRES_USER || 'dbuser',
  password: process.env.POSTGRES_PASSWORD || 'admin2021',
  database: process.env.POSTGRES_DB || 'trello-clone',
  synchronize: false,
  logging: false,
  entities: [`src/entity/**/*.${isCompiled ? 'js' : 'ts'}`],
  migrations: [`src/migration/**/*.${isCompiled ? 'js' : 'ts'}`],
  // "subscribers": ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    //   "subscribersDir": "src/subscriber"
  },
} as ConnectionOptions;

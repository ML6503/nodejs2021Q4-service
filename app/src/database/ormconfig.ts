import { join } from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'src/common/config';
import { DB_TYPE, HOST } from 'src/common/constants';
import User from 'src/entity/user.entity';
import Board from 'src/entity/board.entity';
import Task from 'src/entity/task.entity';

// import { ConnectionOptions } from 'typeorm';

export default {
  type: DB_TYPE,
  host: HOST,
  // host: '127.0.0.1',
  port: config.POSTGRES_PORT,
  username: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  database: config.POSTGRES_DB,
  synchronize: false,
  logging: false,
  migrationsRun: true,
  // entities: [`src/entity/**/*.${isCompiled ? 'js' : 'ts'}`],
  entities: [User, Board, Task],
  // migrations: [`src/database/migration/**/**.entity{.js,.ts}`],
  migrations: [join(__dirname, 'dist/database/migrations/*.{ts,js}')],
  //   migrations: [
  //     `${isCompiled ? 'dist/migration/**/*.js' : 'src/migration/**/*.ts'}`,
  //   ],
  // subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/database/migration',
    // subscribersDir: 'src/subscriber',
  },
} as TypeOrmModuleOptions;

// export = connectionOptions as ConnectionOptions;

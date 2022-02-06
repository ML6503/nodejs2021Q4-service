// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// // import { getMetadataArgsStorage } from 'typeorm';
// // import { config } from 'src/common/config';
// // import { DB_TYPE, HOST } from 'src/common/constants';
// // import User from 'src/entity/user.entity';
// // import Board from 'src/entity/board.entity';
// // import Task from 'src/entity/task.entity';
// import ormconfig from './ormconfig';
// // import { databaseProviders } from './database.providers';

// @Module({
//   // providers: [...databaseProviders],
//   // exports: [...databaseProviders],
//   // imports: [
//   //   TypeOrmModule.forRoot({
//   //     ...ormconfig,
//   //     // entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
//   //   }),
//   // ],

//   // imports: [
//   //   TypeOrmModule.forRoot({
//   //     type: DB_TYPE,
//   //     host: HOST,
//   //     port: config.POSTGRES_PORT,
//   //     username: config.POSTGRES_USER,
//   //     password: config.POSTGRES_PASSWORD,
//   //     database: config.POSTGRES_DB,
//   //     synchronize: false,
//   //     logging: false,
//   //     migrationsRun: true,
//   //     // entities: [`src/entity/**/*.${isCompiled ? 'js' : 'ts'}`],
//   //     entities: [User, Board, Task],
//   //     migrations: [`src/database/migration/**/**.entity{.js,.ts}`],
//   //     //   migrations: [
//   //     //     `${isCompiled ? 'dist/migration/**/*.js' : 'src/migration/**/*.ts'}`,
//   //     //   ],
//   //     subscribers: ['src/subscriber/**/*.ts'],
//   //     cli: {
//   //       entitiesDir: 'src/entity',
//   //       migrationsDir: 'src/database/migration',
//   //       subscribersDir: 'src/subscriber',
//   //     },
//   //   }),
//   // ],
// })
// export class DatabaseModule {}

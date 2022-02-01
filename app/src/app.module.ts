import 'reflect-metadata';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './resources/users/users.module';
import { BoardsModule } from './resources/boards/boards.module';
import { TasksModule } from './resources/tasks/tasks.module';
import LoggerModule from './logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { DatabaseModule } from './database/database.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    LoggerModule,
    UsersModule,
    BoardsModule,
    TasksModule,
    // DatabaseModule,
    TypeOrmModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}

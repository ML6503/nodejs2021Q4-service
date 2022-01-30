import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './resources/users/users.module';
import { BoardsModule } from './resources/boards/boards.module';
import { TasksModule } from './resources/tasks/tasks.module';
import LoggerModule from './logger/logger.module';

@Module({
  imports: [LoggerModule, UsersModule, BoardsModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

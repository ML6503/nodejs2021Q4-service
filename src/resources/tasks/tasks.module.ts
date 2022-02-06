import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Task from 'src/entity/task.entity';
import Board from 'src/entity/board.entity';
import { AuthModule } from 'src/resources/auth/auth.module';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [TypeOrmModule.forFeature([Task, Board]), AuthModule],
  exports: [TypeOrmModule],
})
export class TasksModule {}

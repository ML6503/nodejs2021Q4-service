import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import Task from 'src/entity/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Board from 'src/entity/board.entity';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [TypeOrmModule.forFeature([Task, Board])],
  exports: [TypeOrmModule],
})
export class TasksModule {}

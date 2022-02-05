import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Board from 'src/entity/board.entity';
import Task from 'src/entity/task.entity';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService],
  imports: [TypeOrmModule.forFeature([Board, Task])],
  exports: [TypeOrmModule],
})
export class BoardsModule {}

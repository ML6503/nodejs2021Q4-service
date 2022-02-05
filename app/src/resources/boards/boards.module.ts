import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Board from 'src/entity/board.entity';
import Task from 'src/entity/task.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService],
  imports: [TypeOrmModule.forFeature([Board, Task]), AuthModule],
  exports: [TypeOrmModule],
})
export class BoardsModule {}

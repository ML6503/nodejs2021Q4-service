import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Board from 'src/entity/board.entity';
import Task from 'src/entity/task.entity';
import { AuthModule } from 'src/resources/auth/auth.module';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService],
  imports: [TypeOrmModule.forFeature([Board, Task]), AuthModule],
  exports: [TypeOrmModule],
})
export class BoardsModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IBoard } from 'src/common/interfaces';
import Board from 'src/entity/board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from '../dto/create-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
  ) {}

  create(createBoardDto: CreateBoardDto): IBoard {
    const board = this.boardsRepository.create(createBoardDto);
    return board;
  }

  async findAll(): Promise<IBoard[]> {
    const allBoards = await this.boardsRepository.find();
    // return allTasks.map((task) => new TaskModel(task));
    return allBoards;
  }

  async findOne(boardId: string): Promise<IBoard> {
    const board = await this.boardsRepository.findOne({ id: boardId });
    if (board) {
      return board;
    }
    throw new Error('No board with such board ID');
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const board = await this.boardsRepository.findOne({ id });
    if (board) {
      const updatedBoard = this.boardsRepository.merge(board, updateBoardDto);

      const results = await this.boardsRepository.save(updatedBoard);
      return results;
    }
    throw new Error('Board not found');
  }

  async remove(id: string): Promise<IBoard[]> {
    const board = await this.boardsRepository.findOne({ id });
    if (board) {
      await this.boardsRepository.delete({ id });
      const results = await this.findAll();
      return results;
    }
    throw new Error('Board not found');
  }
}

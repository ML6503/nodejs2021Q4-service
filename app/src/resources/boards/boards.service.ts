import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { IBoard } from 'src/common/interfaces';
import Board from 'src/entity/board.entity';
import Task from 'src/entity/task.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from '../dto/create-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';

@Injectable()
export class BoardsService {
  /**
   * Create Boards Repository services
   * @param boardsRepository
   */
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  /**
   * promise-like function to create user in users repository
   * @param CreateBoardDto - DTO for board to create
   * @returns board object
   */
  async create(createBoardDto: CreateBoardDto): Promise<IBoard> {
    const board = plainToClass(Board, createBoardDto);
    this.boardsRepository.create(createBoardDto);
    await this.boardsRepository.save(board);
    return board;
  }

  /**
   * promise-like function to get all boards from boards repository
   * @returns existing boards
   */
  async findAll(): Promise<IBoard[]> {
    const allBoards = await this.boardsRepository.find();
    if (!allBoards) {
      throw new NotFoundException('User not found');
    }
    return allBoards;
  }

  /**
   * promise-like function to get a board from boards repository
   * @param id of the board type uiid
   * @returns board object with param id from repository
   */
  async findOne(boardId: string): Promise<IBoard> {
    const board = await this.boardsRepository.findOne({ id: boardId });
    if (board) {
      return board;
    }
    throw new NotFoundException('No board with such board ID');
  }

  /**
   * promise-like function to update some or all board details
   * @param id of the board type uiid
   * @param updateUserDto object with updated board details
   * @returns updated board with param id
   */
  async update(id: string, updateBoardDto: UpdateBoardDto) {
    await this.boardsRepository.update(id, updateBoardDto);
    const singleBoard = await this.findOne(id);
    if (singleBoard) {
      return singleBoard;
    }
    throw new NotFoundException('Board not found');
  }

  /**
   * promise-like function to delete board by id
   * @param id of the board type uiid
   * @returns all remaining boards from boards repository
   */
  async remove(id: string): Promise<IBoard[]> {
    const board = await this.boardsRepository.findOne({ id });
    if (board) {
      await this.tasksRepository.delete({ boardId: id });
      await this.boardsRepository.delete({ id });
      const results = await this.findAll();
      return results;
    }
    throw new NotFoundException('Board not found');
  }
}

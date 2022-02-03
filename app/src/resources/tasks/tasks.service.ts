import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import Task from 'src/entity/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import Board from 'src/entity/board.entity';

@Injectable()
export class TasksService {
  /**
   * Create Users Repository services
   * @param tasksRepository
   * @param boardsRepository
   */
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
  ) {}

  /**
   * promise-like function to create task in tasks repository
   * @param createTaskDto - DTO for task to create
   * @returns task object
   */
  async create(createTaskDto: CreateTaskDto) {
    const task = plainToInstance(Task, createTaskDto);
    this.tasksRepository.create(task);
    await this.tasksRepository.save(task);
    return task;
  }

  /**
   * promise-like function to get all tasks from tasks repository
   * @returns existing tasks
   */
  async findAll(): Promise<Task[]> {
    const allTasks = await this.tasksRepository.find();
    if (!allTasks) {
      throw new NotFoundException('Tasks not found');
    }
    return allTasks;
  }

  /**
   * promise-like function to get a user from users repository
   * @param id of the user type uiid
   * @returns user object with param id from repository
   */
  async findOne(taskId: string, boardId: string): Promise<Task> {
    const board = await this.boardsRepository.findOne({ id: boardId });
    if (board) {
      const singleTask = await this.tasksRepository.findOne({ id: taskId });
      if (singleTask) {
        return singleTask;
      }
      throw new NotFoundException('Task not found');
    }
    throw new NotFoundException('No board with such board ID');
  }

  /**
   * promise-like function to update some or all task details
   * @param id of the task type uiid
   * @param updateTaskDto object with updated task details
   * @returns updated task with param id
   */
  async update(boardId: string, taskId: string, updateTaskDto: UpdateTaskDto) {
    const board = await this.boardsRepository.findOne({ id: boardId });
    if (board) {
      await this.tasksRepository.update(taskId, updateTaskDto);
      const singleTask = await this.tasksRepository.findOne({ id: taskId });
      if (singleTask) {
        return singleTask;
      }
      throw new NotFoundException('Task not found');
    }
    throw new NotFoundException('Board not found');
  }

  /**
   * promise-like function to delete task by id
   * @param id of the task type uiid
   * @returns all remaining tasks from tasks repository
   */
  async remove(taskId: string, boardId: string): Promise<Task[]> {
    const board = await this.boardsRepository.findOne({ id: boardId });
    if (board) {
      const singleTask = await this.findOne(taskId, boardId);
      if (singleTask) {
        await this.tasksRepository.delete({ id: taskId });
        const allTasks = await this.findAll();
        return allTasks;
      }
      throw new NotFoundException('Task not found');
    }
    throw new NotFoundException('Board not found');
  }
}

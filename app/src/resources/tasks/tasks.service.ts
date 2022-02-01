import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Task from 'src/entity/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { ITask } from 'src/common/interfaces';
import Board from 'src/entity/board.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
  ) {}

  create(createTaskDto: CreateTaskDto): ITask {
    const task = this.tasksRepository.create(createTaskDto);
    return task;
  }

  async findAll(): Promise<ITask[]> {
    const allTasks = await this.tasksRepository.find();
    // return allTasks.map((task) => new TaskModel(task));
    return allTasks;
  }

  async findOne(taskId: string, boardId: string): Promise<ITask> {
    const board = await this.boardsRepository.findOne({ id: boardId });
    if (board) {
      const singleTask = await this.tasksRepository.findOne({ id: taskId });
      if (singleTask) {
        return singleTask;
      }
      throw new Error('Task not found');
    }
    throw new Error('No board with such board ID');
  }

  async update(boardId: string, taskId: string, updateTaskDto: UpdateTaskDto) {
    const singleTask = await this.tasksRepository.findOne({ id: taskId });
    const board = await this.boardsRepository.findOne({ id: boardId });
    if (board) {
      if (singleTask) {
        const updatedTask = this.tasksRepository.merge(
          singleTask,
          updateTaskDto,
        );

        const results = await this.tasksRepository.save(updatedTask);
        return results;
      }
      throw new Error('Task not found');
    }
    throw new Error('Board not found');
  }

  async remove(taskId: string, boardId: string): Promise<ITask[]> {
    const singleTask = await this.findOne(taskId, boardId);
    const board = await this.boardsRepository.findOne({ id: boardId });
    if (board) {
      if (singleTask) {
        await this.tasksRepository.delete({ id: taskId });
        const allTasks = await this.findAll();
        return allTasks;
      }
      throw new Error('Task not found');
    }
    throw new Error('Board not found');
  }
}

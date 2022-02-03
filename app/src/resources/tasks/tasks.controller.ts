import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreatedTaskDto, CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Controller('/boards/:boardId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<CreatedTaskDto> {
    const task = await this.tasksService.create(createTaskDto);
    const singleTask = await this.tasksService.findOne(task.id, boardId);
    return new CreatedTaskDto(singleTask);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll() {
    const tasks = await this.tasksService.findAll();
    return tasks.map((t) => new CreatedTaskDto(t));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':taskId')
  async findOne(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ) {
    const singleTask = await this.tasksService.findOne(taskId, boardId);
    return new CreatedTaskDto(singleTask);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':taskId')
  async update(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    await this.tasksService.update(boardId, taskId, updateTaskDto);
    const singleTask = await this.tasksService.findOne(taskId, boardId);

    return new CreatedTaskDto(singleTask);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':taskId')
  async remove(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ) {
    await this.tasksService.remove(taskId, boardId);
    const allTasks = await this.tasksService.findAll();

    return allTasks.map((t) => new CreatedTaskDto(t));
  }
}

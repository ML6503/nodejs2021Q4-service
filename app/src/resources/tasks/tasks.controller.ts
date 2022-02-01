import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Controller('/boards/:boardId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':taskId')
  findOne(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ) {
    return this.tasksService.findOne(taskId, boardId);
  }

  @Put(':taskId')
  update(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param(':taskId', ParseUUIDPipe) taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(boardId, taskId, updateTaskDto);
  }

  @Delete(':taskId')
  remove(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param(':taskId', ParseUUIDPipe) taskId: string,
  ) {
    return this.tasksService.remove(taskId, boardId);
  }
}

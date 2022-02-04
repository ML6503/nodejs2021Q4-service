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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import Task from 'src/entity/task.entity';

@ApiTags('tasks')
@Controller('/boards/:boardId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @ApiOperation({ summary: 'Create task' })
  @ApiResponse({ status: 201, type: Task })
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
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, type: [Task] })
  async findAll() {
    const tasks = await this.tasksService.findAll();
    return tasks.map((t) => new CreatedTaskDto(t));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':taskId')
  @ApiOperation({ summary: 'Get single task by id' })
  @ApiResponse({ status: 200, type: Task })
  async findOne(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ) {
    const singleTask = await this.tasksService.findOne(taskId, boardId);
    return new CreatedTaskDto(singleTask);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':taskId')
  @ApiOperation({ summary: 'Change single task details' })
  @ApiResponse({ status: 200, type: Task })
  @ApiBody({ type: CreateTaskDto })
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
  @ApiOperation({ summary: 'Delete single task by id' })
  @ApiResponse({ status: 204 })
  async remove(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ) {
    return await this.tasksService.remove(taskId, boardId);
    // const allTasks = await this.tasksService.findAll();

    // return allTasks.map((t) => new CreatedTaskDto(t));
  }
}

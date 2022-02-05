import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto, CreatedBoardDto } from '../dto/create-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import Board from 'src/entity/board.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('boards')
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create board' })
  @ApiResponse({ status: 201, type: Board })
  @ApiBody({ type: Board })
  async create(@Body() createBoardDto: CreateBoardDto) {
    const newBoard = await this.boardsService.create(createBoardDto);
    const singleBoard = await this.boardsService.findOne(newBoard.id);
    return new CreatedBoardDto(singleBoard);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all boards' })
  @ApiResponse({ status: 200, type: [Board] })
  async findAll() {
    const allBoards = await this.boardsService.findAll();
    return allBoards.map((b) => new CreatedBoardDto(b));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get(':boardId')
  @ApiOperation({ summary: 'Get single board by id' })
  @ApiResponse({ status: 200, type: Board })
  async findOne(@Param('boardId', ParseUUIDPipe || null) boardId: string) {
    const board = await this.boardsService.findOne(boardId);
    return new CreatedBoardDto(board);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Put(':boardId')
  @ApiOperation({ summary: 'Change single board details' })
  @ApiResponse({ status: 200, type: Board })
  @ApiBody({ type: CreateBoardDto })
  async update(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Body() updateBoardDto: UpdateBoardDto
  ) {
    await this.boardsService.update(boardId, updateBoardDto);
    const board = await this.boardsService.findOne(boardId);

    return new CreatedBoardDto(board);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Delete(':boardId')
  @ApiOperation({ summary: 'Delete board by id' })
  @ApiResponse({ status: 204 })
  async remove(@Param('boardId', null || ParseUUIDPipe) boardId: string) {
    await this.boardsService.remove(boardId);
    const allBoards = await this.boardsService.findAll();

    return allBoards.map((b) => new CreatedBoardDto(b));
  }
}

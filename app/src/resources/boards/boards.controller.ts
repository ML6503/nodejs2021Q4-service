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
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto, CreatedBoardDto } from '../dto/create-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createBoardDto: CreateBoardDto) {
    const newBoard = await this.boardsService.create(createBoardDto);
    const singleBoard = await this.boardsService.findOne(newBoard.id);
    return new CreatedBoardDto(singleBoard);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll() {
    const allBoards = await this.boardsService.findAll();
    return allBoards.map((b) => new CreatedBoardDto(b));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':boardId')
  async findOne(@Param('boardId', ParseUUIDPipe) boardId: string) {
    const board = await this.boardsService.findOne(boardId);
    return new CreatedBoardDto(board);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':boardId')
  async update(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    await this.boardsService.update(boardId, updateBoardDto);
    const board = await this.boardsService.findOne(boardId);

    return new CreatedBoardDto(board);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':boardId')
  async remove(@Param('boardId', ParseUUIDPipe) boardId: string) {
    await this.boardsService.remove(boardId);
    const allBoards = await this.boardsService.findAll();

    return allBoards.map((b) => new CreatedBoardDto(b));
  }
}

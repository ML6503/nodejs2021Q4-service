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
import { UsersService } from './users.service';
import { CreateUserDto, CreatedUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto);
    return new CreatedUserDto(newUser);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(): Promise<CreatedUserDto[]> {
    const allUsers = await this.usersService.findAll();

    return allUsers.map((u) => new CreatedUserDto(u));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':userId')
  async findOne(@Param('userId', ParseUUIDPipe) userId: string) {
    const singleUser = await this.usersService.findOne(userId);
    return new CreatedUserDto(singleUser);
  }

  @Put(':userId')
  async update(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  async remove(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.usersService.remove(userId);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, CreatedUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<CreatedUserDto[]> {
    const allUsers = await this.usersService.findAll();
    if (!allUsers) {
      throw NotFoundException;
    }
    return allUsers.map((u) => new CreatedUserDto(u));
  }

  @Get(':userId')
  async findOne(@Param('userId', ParseUUIDPipe) userId: string) {
    const singleUser = await this.usersService.findOne(userId);
    if (!singleUser) {
      throw NotFoundException;
    }
    return new CreatedUserDto(singleUser);
  }

  @Put(':userId')
  async update(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const singleUser = await this.usersService.findOne(userId);
    if (!singleUser) {
      throw NotFoundException;
    }
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  async remove(@Param('userId', ParseUUIDPipe) userId: string) {
    const singleUser = await this.usersService.findOne(userId);
    if (!singleUser) {
      throw NotFoundException;
    }
    return this.usersService.remove(userId);
  }
}

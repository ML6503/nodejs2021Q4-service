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

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<CreatedUserDto> {
    const newUser = await this.usersService.create(createUserDto);
    const singleUser = await this.usersService.findOne(newUser.id);
    return new CreatedUserDto(singleUser);
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

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':userId')
  async update(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usersService.update(userId, updateUserDto);
    const singleUser = await this.usersService.findOne(userId);

    return new CreatedUserDto(singleUser);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':userId')
  async remove(@Param('userId', ParseUUIDPipe) userId: string) {
    await this.usersService.remove(userId);
    const allUsers = await this.usersService.findAll();

    return allUsers.map((u) => new CreatedUserDto(u));
  }
}

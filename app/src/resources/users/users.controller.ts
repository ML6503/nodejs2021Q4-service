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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import User from 'src/entity/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: User })
  async create(@Body() createUserDto: CreateUserDto): Promise<CreatedUserDto> {
    const newUser = await this.usersService.create(createUserDto);
    const singleUser = await this.usersService.findOne(newUser.id);
    return new CreatedUserDto(singleUser);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  async findAll(): Promise<CreatedUserDto[]> {
    const allUsers = await this.usersService.findAll();

    return allUsers.map((u) => new CreatedUserDto(u));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':userId')
  @ApiOperation({ summary: 'Get single user by id' })
  @ApiResponse({ status: 200, type: User })
  async findOne(@Param('userId', ParseUUIDPipe) userId: string) {
    const singleUser = await this.usersService.findOne(userId);
    return new CreatedUserDto(singleUser);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':userId')
  @ApiOperation({ summary: 'Change single user details' })
  @ApiResponse({ status: 200, type: User })
  @ApiBody({ type: CreateUserDto })
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
  @ApiOperation({ summary: 'Delete single user by id' })
  @ApiResponse({ status: 204 })
  async remove(@Param('userId', ParseUUIDPipe) userId: string) {
    return await this.usersService.remove(userId);
    // const allUsers = await this.usersService.findAll();

    // return allUsers.map((u) => new CreatedUserDto(u));
  }
}

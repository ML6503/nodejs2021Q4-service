import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from 'src/entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import Task from 'src/entity/task.entity';
import { IUser } from 'src/common/interfaces';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const user = this.usersRepository.create(createUserDto);
    // const result = await this.usersRepository.save(user);
    // const result = await this.usersRepository.findOne({ id: user.id });
    return user;
  }

  async findAll(): Promise<User[]> {
    const allUsers = await this.usersRepository.find();
    if (!allUsers) {
      throw NotFoundException;
    }
    // return allUsers.map((u) => new CreatedUserDto(u));
    return allUsers;
  }

  async findOne(id: string): Promise<User> {
    const singleUser = await this.usersRepository.findOne({ id });
    if (!singleUser) {
      throw NotFoundException;
    }
    return singleUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const singleUser = await this.findOne(id);
    if (singleUser) {
      const updatedUser = this.usersRepository.merge(singleUser, updateUserDto);

      const results = await this.usersRepository.save(updatedUser);
      return results;
      //  return this.findAll();
    }
    throw NotFoundException;
  }

  async remove(id: string): Promise<User[]> {
    const singleUser = await this.findOne(id);
    if (singleUser) {
      // executes UPDATE task SET userId = null WHERE userId  = id from param
      await this.tasksRepository.update({ id }, { userId: null });
      await this.usersRepository.delete(id);
      return this.findAll();
    }
    throw NotFoundException;
  }
}

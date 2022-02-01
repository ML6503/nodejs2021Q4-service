import { Injectable } from '@nestjs/common';
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

  create(createUserDto: CreateUserDto): IUser {
    const user = this.usersRepository.create(createUserDto);
    return user;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const singleUser = await this.findOne(id);
    if (singleUser) {
      const updatedUser = this.usersRepository.merge(singleUser, updateUserDto);

      const results = await this.usersRepository.save(updatedUser);
      return results;
    }
  }

  async remove(id: string): Promise<User[]> {
    const singleUser = await this.findOne(id);
    if (singleUser) {
      // executes UPDATE task SET userId = null WHERE userId  = id from param
      await this.tasksRepository.update({ id }, { userId: null });
      await this.usersRepository.delete(id);
      return this.findAll();
    }
    throw new Error('User not found');
  }
}

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import User from 'src/entity/user.entity';
import Task from 'src/entity/task.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  /**
   * Create Users Repository services
   * @param usersRepository
   * @param tasksRepository
   */
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  /**
   * promise-like function to create user in users repository
   * @param createUserDto - DTO for user to create
   * @returns user object
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = plainToClass(User, createUserDto);
    this.usersRepository.create(user);
    await this.usersRepository.save(user);

    return user;
  }

  /**
   * promise-like function to get all users from users repository
   * @returns existing users
   */
  async findAll(): Promise<User[]> {
    const allUsers = await this.usersRepository.find();
    if (!allUsers) {
      throw new NotFoundException('Users not found');
    }

    return allUsers;
  }

  /**
   * promise-like function to get a user from users repository
   * @param id of the user type uiid
   * @returns user object with param id from repository
   */
  async findOne(id: string): Promise<User> {
    const singleUser = await this.usersRepository.findOne({ id });
    if (!singleUser) {
      throw new NotFoundException('User not found');
    }
    return singleUser;
  }

  /**
   * promise-like function to get a user from users repository
   * @param login of the user
   * @returns user object with param id from repository
   */
  async findOneByLogin(login: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      login,
    });
    if (user) {
      return user;
    }
    throw new ForbiddenException('Login is forbidden');
  }

  /**
   * promise-like function to update some or all user details
   * @param id of the user type uiid
   * @param updateUserDto object with updated user's details
   * @returns updated user with param id
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(id, updateUserDto);
    const singleUser = await this.findOne(id);
    if (singleUser) {
      return singleUser;
    }
    throw new NotFoundException('User not found');
  }

  /**
   * promise-like function to delete user by id
   * @param id of the user type uiid
   * @returns all remaining users from users repository
   */
  async remove(id: string): Promise<User[]> {
    const singleUser = await this.findOne(id);
    if (singleUser) {
      // executes UPDATE task SET userId = null WHERE userId  = id from param
      await this.tasksRepository.update({ userId: id }, { userId: null });
      await this.usersRepository.delete(id);
      return this.findAll();
    }
    throw new NotFoundException('User not found');
  }
}

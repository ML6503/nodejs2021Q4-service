import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import User from 'src/entity/user.entity';
import Task from 'src/entity/task.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User, Task])],
  exports: [TypeOrmModule],
})
export class UsersModule {}

import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/entity/user.entity';
import Task from 'src/entity/task.entity';
import { AuthModule } from 'src/resources/auth/auth.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User, Task]),
    forwardRef(() => AuthModule),
  ],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}

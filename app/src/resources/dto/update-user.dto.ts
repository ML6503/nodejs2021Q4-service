import { PartialType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  /**
   * Extends by partial type CreateUserDto
   * password is excluded
   */
  @Exclude()
  password: string;
}

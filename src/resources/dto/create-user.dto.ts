import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Name should be string' })
  @IsOptional()
  readonly name: string;

  @IsNotEmpty({ message: 'Login cannot be empty.' })
  readonly login: string;

  @IsNotEmpty({ message: 'Password field cannot be empty.' })
  @Length(1, 50, {
    message: 'Password length is minimum 3 and maximum 15 symbols ',
  })
  readonly password: string;
}

export class CreatedUserDto extends CreateUserDto {
  /**
   * Extends by partial type CreateUserDto
   * password is excluded
   */
  @Exclude()
  @ApiHideProperty()
  password: string;

  @IsUUID()
  @IsOptional()
  readonly id: string;

  constructor(partial: Partial<CreatedUserDto>) {
    super();
    Object.assign(this, partial);
  }
}

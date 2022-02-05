import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Should be string' })
  readonly name: string;

  @IsNotEmpty({ message: 'Login cannot be empty.' })
  readonly login: string;

  @IsString({ message: 'Should be string' })
  @IsNotEmpty({ message: 'Login cannot be empty.' })
  @Length(3, 15, {
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

  readonly id: string;

  constructor(partial: Partial<CreatedUserDto>) {
    super();
    Object.assign(this, partial);
  }
}

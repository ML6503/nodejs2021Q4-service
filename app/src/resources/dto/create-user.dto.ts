import { Exclude } from 'class-transformer';
import { OmitType } from '@nestjs/mapped-types';
import { ApiHideProperty } from '@nestjs/swagger';

export class CreateUserDto {
  readonly name: string;
  // @IsNotEmpty({message: "Login cannot be empty."}
  readonly login: string;
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

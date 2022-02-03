import { Exclude } from 'class-transformer';
import { OmitType } from '@nestjs/mapped-types';

export class CreateUserDto {
  readonly name: string;
  // @IsNotEmpty({message: "Login cannot be empty."}
  readonly login: string;
  readonly password: string;
}

export class CreatedUserDto extends OmitType(CreateUserDto, [
  'password',
] as const) {
  /**
   * Extends by partial type CreateUserDto
   * password is excluded
   */
  @Exclude()
  // @ApiHideProperty()
  password: string;

  constructor(partial: Partial<CreatedUserDto>) {
    super();
    Object.assign(this, partial);
  }
}

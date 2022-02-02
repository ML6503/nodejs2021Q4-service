import { Exclude } from 'class-transformer';
import { OmitType } from '@nestjs/mapped-types';
import User from 'src/entity/user.entity';

export class CreateUserDto {
  readonly name: string;
  // @IsNotEmpty({message: "Login cannot be empty."}
  readonly login: string;
  readonly password: string;
}

export class CreatedUserDto extends OmitType(User, ['password']) {
  @Exclude({ toPlainOnly: true })
  // @ApiHideProperty()
  password: string;
}

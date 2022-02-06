import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateLoginDto {
  @IsNotEmpty({ message: 'Login cannot be empty.' })
  readonly login: string;

  @IsNotEmpty({ message: 'Password field cannot be empty.' })
  @Length(1, 50, {
    message: 'Password length is minimum 3 and maximum 15 symbols ',
  })
  readonly password: string;
}

export class TokenDto {
  @IsString({ message: 'Token should be string' })
  readonly token: string;
}

export class CreateUserDto {
  readonly name: string;
  // @IsNotEmpty({message: "Login cannot be empty."}
  readonly login: string;
  readonly password: string;
}

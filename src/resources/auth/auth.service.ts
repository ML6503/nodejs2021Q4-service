import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateLoginDto } from 'src/resources/dto/create-login.dto';
import { UsersService } from 'src/resources/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(createLoginDto: CreateLoginDto) {
    const authUser = await this.validateUser(createLoginDto);
    return this.generateToken(authUser.login, authUser.id);
  }

  private async generateToken(login: string, id: string) {
    const payload = { login, id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(createLoginDto: CreateLoginDto) {
    const user = await this.usersService.findOneByLogin(createLoginDto.login);
    const match = await bcrypt.compare(createLoginDto.password, user.password);

    if (user && match) {
      return user;
    }

    throw new ForbiddenException('Login is forbidden');
  }
}

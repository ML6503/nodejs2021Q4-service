import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateLoginDto, TokenDto } from 'src/resources/dto/create-login.dto';
import { AuthService } from './auth.service';

@ApiTags('authorisation')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Create login user token' })
  @ApiResponse({ status: 201, type: TokenDto })
  @ApiBody({ type: CreateLoginDto })
  login(@Body() createLoginDto: CreateLoginDto) {
    return this.authService.login(createLoginDto);
  }
}

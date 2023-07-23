import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  NewCredentialsInput,
  SignInCredentialsInput,
} from './dto/credentials.input';
import { AuthService } from './auth.service';
import { Public } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInCredentialsInput) {
    console.log(signInDto)
    return this.authService.signIn(signInDto);
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body() signUpDto: NewCredentialsInput) {
    return this.authService.signUp(signUpDto);
  }
}

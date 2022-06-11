import { Body, Controller, Post } from '@nestjs/common';
import {
  AuthService,
  SignUpDto,
  CredentialsDto,
  User,
} from '@francoadn/ta-core-lib';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth.signUp')
  signUp(@Body() credentials: SignUpDto): Promise<User> {
    return this.authService.signUp(credentials);
  }

  @Post('auth.signIn')
  signIn(@Body() credentials: CredentialsDto): Promise<{ token: string }> {
    return this.authService.signIn(credentials);
  }
}

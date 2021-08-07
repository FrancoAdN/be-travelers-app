import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './auth/get-user.decorator';

@UseGuards(AuthGuard())
@Controller()
export class AppController {

  @Get()
  getHello(@GetUser() user): string {
    return user;
  }
}

import { AccountService, GetUser, User } from '@travelers/core-lib';
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ObjectId } from 'mongodb';

@UseGuards(AuthGuard('jwt'))
@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Put('account.follow/:id')
  async followUser(
    @GetUser() user: User,
    @Param('id') followed: string,
  ): Promise<void> {
    let parsedFollowed: ObjectId;
    try {
      parsedFollowed = new ObjectId(followed);
    } catch (error) {
      throw new BadRequestException();
    }
    await this.accountService.findById(parsedFollowed);
    await this.accountService.followUser(user._id, followed);
  }

  @Get('account.findAccountDetails/:id')
  findAccountInformation(
    @GetUser() user: User,
    @Param('id') userId: string,
  ): Promise<User> {
    return this.accountService.findAccountDetails(userId);
  }
}

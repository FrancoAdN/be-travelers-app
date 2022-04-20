import { Body, Controller, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ObjectId } from 'mongoose';
import { Publication } from '..';
import { GetUser, User } from '../../auth';
import { PublicationPayloadDto } from '../dtos';
import { PublicationService } from '../services';

@UseGuards(AuthGuard('jwt'))
@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Post('publish')
  createPublication(
    @GetUser() user: User,
    @Body() payload: PublicationPayloadDto,
  ): Promise<Publication> {
    const userId = user._id.toHexString();
    return this.publicationService.createPublication(payload, userId);
  }

  findMultipleByUser(
    @GetUser() user: User,
    @Query('userId') userId: string,
  ): Promise<Publication[]> {
    return this.publicationService.findMultipleByUser(userId);
  }
}

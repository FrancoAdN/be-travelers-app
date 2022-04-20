import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ObjectId } from 'mongodb';
import { Publication } from '..';
import { GetUser, User } from '../../auth';
import { PublicationPayloadDto } from '../dtos';
import { PublicationService } from '../services';

@UseGuards(AuthGuard('jwt'))
@Controller()
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  /**
   * Creates a new publication
   * @param {User}                  user    - User who makes the request
   * @param {PublicationPayloadDto} payload - Payload of the publication to be created
   * @returns {Promise<Publication>}
   */
  @Post('publication.publish')
  createPublication(
    @GetUser() user: User,
    @Body() payload: PublicationPayloadDto,
  ): Promise<Publication> {
    const userId = user._id.toHexString();
    return this.publicationService.createPublication(payload, userId);
  }

  /**
   * Brings the publications of a given user
   * @param {User}   user   - User who makes the request
   * @param {String} userId - User id to filter by
   * @returns
   */
  @Get('publication.findByUserId')
  findMultipleByUser(
    @GetUser() user: User,
    @Query('userId') userId: string,
  ): Promise<Publication[]> {
    return this.publicationService.findMultipleByUser(userId);
  }

  /**
   * Marks a publication as seen by a user
   * @param {User}     user           - User who makes the request
   * @param {ObjectId} publicationId  - Publication identifier to be marked
   * @returns {Promise<void>}
   */
  @Put('publication.markAsSeen/:id')
  markAsSeen(
    @GetUser() user: User,
    @Param('id') publicationId: ObjectId,
  ): Promise<void> {
    return this.publicationService.markPublicationAsSeen(
      new ObjectId(publicationId),
      user._id.toHexString(),
    );
  }
}

import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AlbumService } from '../services';
import { GetUser, User } from '../../auth';
import { AlbumPayloadDto } from '../dtos';
import { createAlbumEntity } from '../helpers';
import { Album } from '../schemas';

@UseGuards(AuthGuard('jwt'))
@Controller()
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post('album')
  publishAlbum(
    @GetUser() user: User,
    @Body() albumDto: AlbumPayloadDto,
  ): Promise<Album> {
    return this.albumService.create(createAlbumEntity(albumDto, user));
  }
}

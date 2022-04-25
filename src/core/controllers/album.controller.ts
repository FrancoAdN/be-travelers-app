import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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

  @Get('album.findByOwner')
  findByOwner(@GetUser() user: User): Promise<Album[]> {
    return this.albumService.findByOwner(user._id);
  }
}

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  AlbumService,
  GetUser,
  User,
  Album,
  AlbumPayloadDto,
  createAlbumEntity,
} from '@travelers/core-lib';

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

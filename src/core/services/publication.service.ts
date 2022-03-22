import { Injectable } from '@nestjs/common';
import { Publication } from '..';
import { PublicationPayloadDto } from '../dtos';
import { AlbumRepository, PublicationRepository } from '../repositories';
import { ObjectId } from 'mongodb';
import { AlbumService } from '.';

@Injectable()
export class PublicationService {
  constructor(
    protected readonly repository: PublicationRepository,
    protected readonly albumService: AlbumService,
  ) {}

  async createPublication(payload: PublicationPayloadDto, userId: string) {
    // update album entity
    const albumId = new ObjectId(payload.albumId);
    await this.albumService.markAlbumAsPublished(albumId, userId);

    const publication = new Publication({
      albumId: new ObjectId(payload.albumId),
      caption: payload.caption,
    });

    return this.repository.createOne(publication, userId);
  }
}

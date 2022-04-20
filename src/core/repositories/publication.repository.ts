import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Publication, PublicationDocument } from '../schemas';
import { BaseRepository } from './base.repository';

export class PublicationRepository extends BaseRepository {
  constructor(
    @InjectModel(Publication.name)
    private readonly publicationModel: Model<PublicationDocument>,
  ) {
    super(publicationModel);
  }

  findMultipleByUserId(userId: string): Promise<Publication[]> {
    return this.publicationModel.find({ createdBy: userId }).exec();
  }
}

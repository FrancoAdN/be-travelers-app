import { Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { Album } from "..";
import { AlbumRepository } from "../repositories";

@Injectable()
export class AlbumService {
    constructor(protected readonly repository: AlbumRepository) {}

    markAlbumAsPublished(albumId: ObjectId, userId: string): Promise<Album>{
        const album = new Album({
            updatedAt: new Date(),
            updatedBy: userId,
            published: true
        });
        return this.repository.findOneAndUpdate(
            { _id : albumId },
            album,
            null,
            true
        );
    }
}
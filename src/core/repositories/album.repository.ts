import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AlbumDocument, Album } from "../schemas";

export class AlbumRepository {
    constructor(@InjectModel(Album.name) private readonly albumModel: Model<AlbumDocument>) {}
}
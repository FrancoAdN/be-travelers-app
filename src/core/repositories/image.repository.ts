import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ImageDocument, Image } from "../schemas";
import { BaseRepository } from "./base.repository";

export class ImageRepository extends BaseRepository {
    constructor(
        @InjectModel(Image.name)
        private readonly imageModel: Model<ImageDocument>
    ) {
        super(imageModel)
    }
}
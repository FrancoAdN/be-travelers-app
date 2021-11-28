import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ImageDocument, Image } from "../schemas";

export class ImageRepository {
    constructor(@InjectModel(Image.name) private readonly albumModel: Model<ImageDocument>) {}
}
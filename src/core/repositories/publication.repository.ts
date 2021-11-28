import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Publication, PublicationDocument } from "../schemas";

export class PublicationRepository {
    constructor(@InjectModel(Publication.name) private readonly albumModel: Model<PublicationDocument>) {}
}

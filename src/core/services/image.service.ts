import { Injectable } from "@nestjs/common";
import { ImageRepository } from "../repositories";

@Injectable()
export class ImageService {
    constructor(protected readonly repository: ImageRepository) {}
}
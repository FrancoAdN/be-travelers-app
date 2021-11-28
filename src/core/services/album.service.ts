import { Injectable } from "@nestjs/common";
import { AlbumRepository } from "../repositories";

@Injectable()
export class AlbumService {
    constructor(protected readonly repository: AlbumRepository) {}
}
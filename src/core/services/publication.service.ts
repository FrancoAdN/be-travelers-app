import { Injectable } from "@nestjs/common";
import { PublicationRepository } from "../repositories";

@Injectable()
export class PublicationService {
    constructor(protected readonly repository: PublicationRepository) {}
}
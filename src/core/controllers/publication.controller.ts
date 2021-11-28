import { Controller } from "@nestjs/common";
import { PublicationService } from "../services";

@Controller('publication')
export class PublicationController {
    constructor(private readonly publicationService: PublicationService ) {}
}
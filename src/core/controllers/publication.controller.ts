import { Body, Controller, Post } from "@nestjs/common";
import { Publication } from "..";
import { GetUser, User } from "../../auth";
import { PublicationPayloadDto } from "../dtos";
import { PublicationService } from "../services";

@Controller('publication')
export class PublicationController {
    constructor(private readonly publicationService: PublicationService ) {}

    @Post('publish')
    createPublication(@GetUser() user: User, @Body() payload: PublicationPayloadDto): Promise<Publication> {
        const userId = user._id.toHexString();
        return this.publicationService.createPublication(payload, userId);
    }
    
}
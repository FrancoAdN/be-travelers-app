import { Controller } from "@nestjs/common";
import { AlbumService } from "../services";

@Controller('album')
export class AlbumController {
    constructor(private readonly albumService: AlbumService ) {}
}
import { IsNotEmpty, IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class PublicationPayloadDto {
    @IsNotEmpty()
    albumId: string;

    @IsString()
    @IsNotEmpty()
    caption: string;

}
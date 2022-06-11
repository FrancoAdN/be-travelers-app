import {
  Controller,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongodb';
import { Readable } from 'stream';
import { AuthGuard } from '@nestjs/passport';
import {
  GetUser,
  ImagePayloadDto,
  ImageService,
  User,
  Image,
} from '@francoadn/ta-core-lib';

@UseGuards(AuthGuard('jwt'))
@Controller()
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('images.upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadEvidence(
    @GetUser() user: User,
    @UploadedFiles() files: ImagePayloadDto[],
    @Query('parentAlbum') parentAlbum: ObjectId,
  ): Promise<Image[]> {
    const promises: Promise<Image>[] = files.map((file) => {
      const stream = new Readable({
        read() {
          stream.push(file.buffer);
          stream.push(null);
        },
      });
      return this.imageService.create(
        file,
        stream,
        parentAlbum,
        user._id.toHexString(),
      );
    });

    const images: Image[] = await Promise.all(promises);
    return images;
  }
}

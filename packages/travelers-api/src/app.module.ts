import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule, TravelersModule } from '@travelers/core-lib';
import {
  AlbumController,
  ImageController,
  PublicationController,
} from './controllers';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    AuthModule,
    TravelersModule,
  ],
  controllers: [AlbumController, ImageController, PublicationController],
})
export class AppModule {}

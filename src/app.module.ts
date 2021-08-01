import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';

const mongodbURI = 'mongodb://travelers:travelers@localhost:27017/travelers?authSource=admin'

@Module({
  imports: [
    MongooseModule.forRoot(mongodbURI),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';

const mongodbURI = 'mongodb://travelers:travelers@localhost:27017/travelers?authSource=admin'

@Module({
  imports: [
    MongooseModule.forRoot(mongodbURI),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

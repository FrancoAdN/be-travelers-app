import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core';

const mongodbURI = 'mongodb://travelers:travelers@localhost:27017/travelers?authSource=admin'

@Module({
  imports: [
    MongooseModule.forRoot(mongodbURI),
    AuthModule,
    CoreModule,
  ],
})
export class AppModule {}

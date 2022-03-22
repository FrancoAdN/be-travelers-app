import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth';
import { CoreModule } from './core';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    AuthModule,
    CoreModule,
  ],
})
export class AppModule {}

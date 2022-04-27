import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '@travelers/core-lib';
import { AuthController } from './controllers';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_DB_URI), AuthModule],
  controllers: [AuthController],
})
export class AppModule {}

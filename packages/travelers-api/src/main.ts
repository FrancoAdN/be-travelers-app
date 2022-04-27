import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PREFIX } from './constants/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(PREFIX);
  await app.listen(process.env.PORT);
}
bootstrap();

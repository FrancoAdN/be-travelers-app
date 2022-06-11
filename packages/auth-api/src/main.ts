import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { LoggingInterceptor } from '@travelers/core-lib';
import { AppModule } from './app.module';
import { PREFIX } from './constants/constants';

const loggingInterceptor = () => {
  const interceptor = new LoggingInterceptor();
  interceptor.setUserPrefix(PREFIX);
  return interceptor;
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(PREFIX);
  app.useGlobalInterceptors(loggingInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(process.env.PORT);
}
bootstrap();

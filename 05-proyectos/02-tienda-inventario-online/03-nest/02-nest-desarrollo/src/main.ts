import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  // app.use(express.json({ limit: '10mb' }));
  app.enableCors();

  await app.listen(3000);
}
bootstrap();

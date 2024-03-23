import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { jwtConstants } from './auth/constansts';

// import * as express from 'express';
const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: jwtConstants.secret,
      resave: false,
      saveUninitialized: true,
      // rolling: true,
      // cookie: {
      //   secure: true,
      //   httpOnly: false,
      //   sameSite: 'none',
      //   maxAge: 60 * 60 * 24 * 1000,
      // },
    }),
  );

  // app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  // app.use(express.json({ limit: '10mb' }));
  app.enableCors({
    origin: true, // Reemplaza con tu dominio de túnel
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  });

  await app.listen(port);
}
bootstrap();

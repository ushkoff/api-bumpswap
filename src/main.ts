import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/app.module';
import { urlencoded, json } from 'express';

const serverPort = 3003;
const serverHost = '0.0.0.0';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: true,
  });

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app
    .setGlobalPrefix('api')
    .use(json({ limit: '50mb' }))
    .use(urlencoded({ extended: true, limit: '50mb' }))
    .useGlobalPipes(new ValidationPipe());

  await app.init();
  await app.listen(serverPort, serverHost);
}

bootstrap()
  .catch(err => {
    console.log(err);
    console.log('gor error on application start: ', JSON.stringify(err, null, 4));
  });
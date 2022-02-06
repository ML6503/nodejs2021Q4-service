import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { config } from './common/config';

async function bootstrap() {
  let app: NestFastifyApplication | NestExpressApplication;
  if (process.env.USE_FASTIFY === 'true') {
    app = await NestFactory.create<NestFastifyApplication>(AppModule, {
      bufferLogs: true,
    });
  }

  app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(Logger));
  const configSwagger = new DocumentBuilder()
    .setTitle('Trello Clone @ RS School NodeJS')
    .setDescription('Trello Clone API description')
    .setVersion('1.0')
    .addTag('trello-clone')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(config.PORT, '0.0.0.0', () =>
    console.log(`Server listen on port ${config.PORT}`),
  );
}

bootstrap();

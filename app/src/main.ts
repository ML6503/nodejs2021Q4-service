import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
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
  await app.listen(config.PORT, '0.0.0.0', () =>
    console.log(`Server listen on port ${config.PORT}`),
  );
}

bootstrap();

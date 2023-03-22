import { configEnvFile } from '@@common/misc/config-env-file';

configEnvFile('.env');

import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { envs } from './envs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.use(cookieParser());

  const origin = envs.ENABLE_CORS_ORIGINS ? envs.ENABLE_CORS_ORIGINS.split(',') : [];
  app.enableCors({
    origin,
  });

  await app.listen(envs.PORT);
}
bootstrap();

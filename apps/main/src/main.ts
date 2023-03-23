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

  app.enableCors({
    origin: envs.FRONTEND_BASE_URL,
    credentials: true,
    preflightContinue: false,
  });

  await app.listen(envs.PORT);
}
bootstrap();

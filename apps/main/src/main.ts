import { configEnvFile } from '@@common/misc/config-env-file';

configEnvFile('.env');

import { devCorsOptions } from '@@common/misc/dev-cors-options';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './envs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  if (envs.NODE_ENV !== 'production') {
    app.enableCors(devCorsOptions);
  }

  await app.listen(envs.PORT);
}
bootstrap();

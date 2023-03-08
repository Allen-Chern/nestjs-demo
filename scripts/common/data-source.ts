import { config } from 'dotenv';
config({ path: '.env' });

import { EnvVariableNotSetError } from '@@common/misc/env-variable-not-set-error';
import { entities } from '@@database/entities';
import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';

const { DATABASE_HOST, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_DATABASE } =
  process.env;

const envs = {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_DATABASE,
};

Object.entries(envs).forEach(([key, value]) => {
  if (!value) {
    throw new EnvVariableNotSetError(key);
  }

  envs[key as keyof typeof envs] = value.replace(/\\n/gi, '\n').replace(/(^"|"$)/gi, '');
});

export const initDb = async () => {
  const dataSource = new DataSource({
    type: 'postgres',
    host: envs.DATABASE_HOST,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    port: +envs.DATABASE_PORT!,
    username: envs.DATABASE_USERNAME,
    password: envs.DATABASE_PASSWORD,
    database: envs.DATABASE_DATABASE,
    entities,
    logging: 'all',
    logger: 'advanced-console',
    maxQueryExecutionTime: 300,
    useUTC: true,
    extra: { max: 10 },
    synchronize: false,
  });

  await dataSource.initialize();

  return dataSource;
};

export const dataSource: Provider = {
  provide: DataSource,
  useFactory: async () => {
    return initDb();
  },
};

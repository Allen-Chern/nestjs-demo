import { entities } from '@@database/entities';
import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { envs } from './envs';

export const dataSource: Provider = {
  provide: DataSource,
  useFactory: async () => {
    const dataSource = new DataSource({
      type: 'postgres',
      host: envs.DATABASE_HOST,
      port: +envs.DATABASE_PORT,
      username: envs.DATABASE_USERNAME,
      password: envs.DATABASE_PASSWORD,
      database: envs.DATABASE_DATABASE,
      entities,
      logging: envs.NODE_ENV === 'development' ? 'all' : ['error', 'schema', 'warn'],
      logger: 'advanced-console',
      maxQueryExecutionTime: 300,
      useUTC: true,
      extra: { max: 10 },
      synchronize: false,
      ssl: envs.DATABASE_SSL.toLowerCase() === 'true',
    });

    await dataSource.initialize();

    return dataSource;
  },
};

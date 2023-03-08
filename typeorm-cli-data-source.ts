import { config } from 'dotenv';
config({ path: '.env' });

import { entities } from '@@database/entities';
import { DataSource } from 'typeorm';

const { DATABASE_HOST, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_DATABASE } =
  process.env;

if (
  !DATABASE_HOST ||
  !DATABASE_PORT ||
  !DATABASE_USERNAME ||
  !DATABASE_PASSWORD ||
  !DATABASE_DATABASE
) {
  throw new Error('Database envs not set.');
}

const dataSourceOptions = {
  type: 'postgres' as const,
  host: DATABASE_HOST,
  port: +DATABASE_PORT,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_DATABASE,
  logging: true,
  logger: 'advanced-console' as const,
  entities,
  migrations: ['database/migrations/*.ts'],
};

exports.default = new DataSource(dataSourceOptions);

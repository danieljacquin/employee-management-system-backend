import * as path from 'path';

import { DataSource } from 'typeorm';

import { envs } from './envs';

const isDevelopment = envs.node_env !== 'production';

const entitiesPath = path.join(
  __dirname,
  '..',
  'modules',
  '**',
  isDevelopment ? '*.entity.ts' : '*.entity.js',
);

const migrationsPath = path.join(
  __dirname,
  '..',
  'database',
  'migrations',
  isDevelopment ? '*.ts' : '*.js',
);

const dataSource = new DataSource({
  type: 'postgres',
  host: envs.host,
  port: envs.db_port,
  username: envs.username,
  password: envs.password,
  database: envs.database,
  synchronize: isDevelopment,
  logging: isDevelopment,
  entities: [entitiesPath],
  migrations: [migrationsPath],
});

export default dataSource;

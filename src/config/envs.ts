import * as dotenv from 'dotenv';
import * as envVar from 'env-var';
dotenv.config();

export const envs = {
  port: envVar.get('PORT').asString(),
  type: envVar.get('TYPE').default('postgres'),
  node_env: envVar.get('NODE_ENV').default('development').asString(),
  host: envVar.get('DB_HOST').asString(),
  db_port: envVar.get('DB_PORT').asPortNumber(),
  username: envVar.get('DB_USER').asString(),
  password: envVar.get('DB_PASSWORD').asString(),
  database: envVar.get('DB_NAME').asString(),
};

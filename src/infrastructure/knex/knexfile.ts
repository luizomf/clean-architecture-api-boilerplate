// These values can be configured in .env file

import dotenv from 'dotenv';
import { resolve } from 'path';

const dotenvFilePath = resolve(__dirname, '..', '..', '..', '.env');
dotenv.config({ path: dotenvFilePath });

module.exports = {
  test: {
    client: 'sqlite3',
    connection: ':memory:',
    useNullAsDefault: true,
    debug: false,
  },
  development: {
    client: 'sqlite3',
    connection: {
      filename: resolve(__dirname, './dev.sqlite3'),
    },
    useNullAsDefault: true,
    debug: false,
  },
  production: {
    client: process.env.DATABASE_CLIENT || 'postgresql',
    connection: {
      host: process.env.DATABASE_HOST || '127.0.0.1',
      database: process.env.DATABASE_NAME || 'database_name',
      user: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      port: parseInt(process.env.DATABASE_PORT || '5432'),
    },
    pool: {
      min: 2,
      max: 10,
    },
    debug: false,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: resolve(__dirname, 'migrations'),
  },
  seeds: {
    directory: resolve(__dirname, 'seeds'),
  },
};

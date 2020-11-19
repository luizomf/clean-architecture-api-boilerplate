import dotenv from 'dotenv';
import { resolve } from 'path';

const dotenvFilePath = resolve(__dirname, '..', '..', '..', '.env');
dotenv.config({ path: dotenvFilePath });

export default {
  test: {
    client: 'sqlite3',
    connection: ':memory:',
    useNullAsDefault: true,
  },
  development: {
    client: 'sqlite3',
    connection: {
      filename: resolve(__dirname, './dev.sqlite3'),
    },
    useNullAsDefault: true,
  },
  production: {
    client: process.env.DATABASE_CLIENT,
    connection: {
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      port: process.env.DATABASE_PORT,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: resolve(__dirname, 'migrations'),
    },
    seeds: {
      directory: resolve(__dirname, 'seeds'),
    },
  },
};

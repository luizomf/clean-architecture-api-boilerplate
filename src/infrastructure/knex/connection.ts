import knex from 'knex';
import config from './knexfile';

type Environment = 'test' | 'development' | 'production';
const env: Environment = process.env.NODE_ENV as Environment;

export const db = knex(config[env]);

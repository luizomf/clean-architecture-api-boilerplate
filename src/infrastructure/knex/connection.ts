import knex from 'knex';
import config from './knexfile';

type Environment = 'development' | 'production';
const env: Environment = process.env.ENVIRONMENT as Environment;

export const db = knex(config[env]);

import knex from 'knex';
const knexConnection = require('./knexfile');

type Environment = 'test' | 'development' | 'production';
const env = (process.env.NODE_ENV as Environment) || 'development';
export const db = knex(knexConnection[env]);

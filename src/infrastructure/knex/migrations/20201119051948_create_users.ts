import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (t) => {
    t.increments('id').primary();
    t.string('first_name', 100).notNullable();
    t.string('last_name', 100).notNullable();
    t.string('email', 254).notNullable().unique();
    t.string('password_hash', 60).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}

import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('roles', (t) => {
    t.increments('id').primary();
    t.string('name', 255).notNullable().unique();
    t.string('description', 255);
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('roles');
}

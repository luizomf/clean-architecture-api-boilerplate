import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tokens', (t) => {
    t.increments('id').primary();
    t.string('token', 255).notNullable();
    t.integer('user_id').unsigned().notNullable();
    t.timestamp('expires_in').notNullable();
    t.timestamps(true, true);
    t.foreign('user_id')
      .references('users.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tokens');
}

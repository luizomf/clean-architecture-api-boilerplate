import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('roles').del();

  // Inserts seed entries
  await knex('roles').insert([
    {
      name: 'admin',
      description: 'Provides all privileges',
    },
    {
      name: 'public',
      description: 'Same as not having any privileges',
    },
    // You can add more privileges to use in any route
  ]);
}

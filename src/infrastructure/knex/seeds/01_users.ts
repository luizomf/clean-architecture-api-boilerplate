import * as Knex from 'knex';
const {
  BCryptAdapter,
} = require('../../../common/adapters/security/bcrypt-adapter');

const bcryptAdapter = new BCryptAdapter();

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  const adminPassword = await bcryptAdapter.hash('admin');

  // Inserts seed entries
  await knex('users').insert([
    {
      first_name: 'admin',
      last_name: 'admin',
      email: 'admin@admin.com',
      password_hash: adminPassword,
    },
  ]);
}

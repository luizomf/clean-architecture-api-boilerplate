import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('user_roles').del();

  const admin = await knex('users')
    .where('email', '=', 'admin@admin.com')
    .first();
  const role = await knex('roles').where('name', '=', 'admin').first();

  // Inserts seed entries
  await knex('user_roles').insert([
    {
      user_id: admin.id,
      role_id: role.id,
    },
  ]);
}

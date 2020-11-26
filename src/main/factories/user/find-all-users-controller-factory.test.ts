import { UserEntity } from '~/domain/user/entities/user';
import { db } from '~/infrastructure/knex/connection';
import { findAllUsersControllerFactory } from './find-all-users-controller-factory';

const sutFactory = () => {
  const { findAllUsersController: sut } = findAllUsersControllerFactory();

  return {
    sut,
  };
};

describe('findAllUsersControllerFactory', () => {
  beforeAll(async () => {
    await db.migrate.latest({ directory: process.env.MIGRATIONS });
    await db<UserEntity>('users').insert([
      {
        first_name: 'first_1',
        last_name: 'last_1',
        email: 'email_1@email.com',
        password_hash: 'hash_1',
      },
      {
        first_name: 'first_2',
        last_name: 'last_2',
        email: 'email_2@email.com',
        password_hash: 'hash_2',
      },
      {
        first_name: 'first_3',
        last_name: 'last_3',
        email: 'email_3@email.com',
        password_hash: 'hash_3',
      },
      {
        first_name: 'first_4',
        last_name: 'last_4',
        email: 'email_4@email.com',
        password_hash: 'hash_4',
      },
      {
        first_name: 'first_5',
        last_name: 'last_5',
        email: 'email_5@email.com',
        password_hash: 'hash_5',
      },
      {
        first_name: 'first_6',
        last_name: 'last_6',
        email: 'email_6@email.com',
        password_hash: 'hash_6',
      },
      {
        first_name: 'first_7',
        last_name: 'last_7',
        email: 'email_7@email.com',
        password_hash: 'hash_7',
      },
      {
        first_name: 'first_8',
        last_name: 'last_8',
        email: 'email_8@email.com',
        password_hash: 'hash_8',
      },
      {
        first_name: 'first_9',
        last_name: 'last_9',
        email: 'email_9@email.com',
        password_hash: 'hash_9',
      },
      {
        first_name: 'first_10',
        last_name: 'last_10',
        email: 'email_10@email.com',
        password_hash: 'hash_10',
      },
    ]);
  });

  afterAll(async () => {
    await db.destroy();
  });

  it('should find all users', async () => {
    const { sut } = sutFactory();
    const response = await sut.handleRequest({});
    expect(response.body.length).toBe(10);
  });

  it('should limit users', async () => {
    const { sut } = sutFactory();
    const response = await sut.handleRequest({ query: { limit: 2 } });
    expect(response.body.length).toBe(2);
  });

  it('should accept order asc and desc', async () => {
    const { sut } = sutFactory();

    let response = await sut.handleRequest({ query: { order: 'asc' } });
    expect(response.body[0].id).toBe(1);

    response = await sut.handleRequest({ query: { order: 'desc' } });
    expect(response.body[0].id).toBe(10);
  });

  it('should be able to get users with limit and offset', async () => {
    const { sut } = sutFactory();

    const response = await sut.handleRequest({
      query: { order: 'desc', limit: 2, offset: 2 },
    });

    expect(response.body[0].id).toBe(8);
    expect(response.body[1].id).toBe(7);
  });
});

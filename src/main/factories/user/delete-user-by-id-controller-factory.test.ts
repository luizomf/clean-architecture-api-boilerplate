/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '~/domain/user/user';
import { db } from '~/infrastructure/knex/connection';
import { deleteUserByIdControllerFactory } from './delete-user-by-id-controller-factory';

const sutFactory = () => {
  const { deleteUserByIdController: sut } = deleteUserByIdControllerFactory();

  return {
    sut,
  };
};

describe('createUserControllerFactory', () => {
  beforeAll(async () => {
    await db.migrate
      .latest({ directory: process.env.MIGRATIONS })
      .then(async () => {
        await db<User>('users').insert([
          {
            first_name: 'user1',
            last_name: 'user11',
            email: 'user1@email.com',
            password_hash: 'any_hash1',
          },
          {
            first_name: 'user2',
            last_name: 'user22',
            email: 'user2@email.com',
            password_hash: 'any_hash2',
          },
          {
            first_name: 'user3',
            last_name: 'user133',
            email: 'user3@email.com',
            password_hash: 'any_hash3',
          },
        ]);
      });
  });

  afterAll(async () => {
    await db.destroy();
  });

  it('should throw if request or request.id is not present', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.handleRequest({} as any);
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
    expect(error.message).toBe('Missing id');
    expect(error.statusCode).toBe(400);
  });

  it('should delete user if exists', async () => {
    const { sut } = sutFactory();
    const response = await sut.handleRequest({ params: { id: '1' } });
    expect(response.statusCode).toBe(204);
    expect(response.body).toBeUndefined();
  });

  it('should throw if user does not exist', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.handleRequest({ params: { id: 'abc' } });
    } catch (e) {
      error = e;
    }

    expect(error.statusCode).toBe(404);
    expect(error.name).toBe('NotFoundError');
    expect(error.message).toBe('User does not exist');
  });
});

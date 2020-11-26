/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '~/domain/user/entities/user';
import { db } from '~/infrastructure/knex/connection';
import { updateUserControllerFactory } from './update-user-controller-factory';

const sutFactory = () => {
  const { updateUserController: sut } = updateUserControllerFactory();

  return {
    sut,
  };
};

describe('updateUserControllerFactory', () => {
  beforeAll(async () => {
    await db.migrate.latest({ directory: process.env.MIGRATIONS });
    await db<User>('users').insert([
      {
        first_name: 'first1',
        last_name: 'last1',
        email: 'email1@email.com',
        password_hash: 'any_hash1',
      },
      {
        first_name: 'first2',
        last_name: 'last2',
        email: 'email2@email.com',
        password_hash: 'any_hash2',
      },
      {
        first_name: 'first3',
        last_name: 'last3',
        email: 'email3@email.com',
        password_hash: 'any_hash3',
      },
    ]);
  });

  afterAll(async () => {
    await db.destroy();
  });

  it('should throw if body is missing', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.handleRequest({ params: {} } as any);
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
  });

  it('should throw if params is missing', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.handleRequest({ body: {} });
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
  });

  it('should throw if params.id is missing', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.handleRequest({ body: {}, params: {} } as any);
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
  });

  it('should throw if request if correct but user does not exist', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.handleRequest({
        body: { first_name: 'first' },
        params: { id: 'abc' },
      });
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('NotFoundError');
  });

  it('should throw if request.body has no values', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.handleRequest({ body: {}, params: { id: '1' } });
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
    expect(error.message).toBe('Cannot proceed if body has no values');
  });

  it('should throw email is invalid', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.handleRequest({
        body: { email: 'any_value' },
        params: { id: '1' },
      });
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('EmailValidationError');
  });

  it('should update user if everything is OK', async () => {
    const { sut } = sutFactory();
    const response = await sut.handleRequest({
      params: { id: '1' },
      body: {
        first_name: 'new_first',
        last_name: 'new_last',
        email: 'bla@gmail.com',
        password: '321',
        confirmPassword: '321',
      },
    });
    expect(response.statusCode).toBe(204);
    expect(response.body).toBeUndefined();
  });
});

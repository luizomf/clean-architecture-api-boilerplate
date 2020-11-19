import { db } from '~/infrastructure/knex/connection';
import { findUserByIdControllerFactory } from './find-user-by-id-controller-factory';

const sutFactory = () => {
  const {
    findUserByIdController: sut,
    findUserByIdUseCase,
  } = findUserByIdControllerFactory();

  return {
    sut,
    findUserByIdUseCase,
  };
};

describe('findUserByIdControllerFactory', () => {
  beforeAll(async () => {
    await db.migrate.latest({ directory: process.env.MIGRATIONS });
    await db('users').insert({
      first_name: 'first_name',
      last_name: 'last_name',
      email: 'email@email.com',
      password_hash: 'anything',
    });
  });

  afterAll(async () => {
    await db.destroy();
  });

  it('should find a user with no errors', async () => {
    const { sut } = sutFactory();

    const response = await sut.handleRequest({
      params: { id: '1' },
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      id: '1',
      first_name: 'first_name',
      last_name: 'last_name',
      email: 'email@email.com',
    });
  });
});

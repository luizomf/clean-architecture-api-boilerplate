import { db } from '~/infrastructure/knex/connection';
import { createUserControllerFactory } from './create-user-controller-factory';

const sutFactory = () => {
  const {
    createUserController: sut,
    createUserRepository,
  } = createUserControllerFactory();

  return {
    sut,
    createUserRepository,
  };
};

const { sut } = sutFactory();

describe('createUserControllerFactory', () => {
  beforeAll(async () => {
    await db.migrate.latest({ directory: process.env.MIGRATIONS });
  });

  afterAll(async () => {
    await db.destroy();
  });

  it('should create a user with no errors', async () => {
    const newUser = {
      first_name: 'first_name',
      last_name: 'last_name',
      email: 'email@email.com',
      password: 'password',
      confirmPassword: 'password',
    };

    const response = await sut.handleRequest({
      body: { ...newUser },
    });

    expect(response.body.id).toBeTruthy();
    expect(response.body.first_name).toBe(newUser.first_name);
    expect(response.body.last_name).toBe(newUser.last_name);
    expect(response.body.email).toBe(newUser.email);
    expect(response.statusCode).toBe(201);
  });
});

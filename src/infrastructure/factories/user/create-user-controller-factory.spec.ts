import { createUserControllerFactory } from './create-user-controller-factory';

const sutFactory = () => {
  const { createUserController: sut } = createUserControllerFactory();

  return {
    sut,
  };
};

describe('createUserControllerFactory', () => {
  it('should create a user with no errors', async () => {
    const { sut } = sutFactory();

    const newUser = {
      first_name: 'first_name',
      last_name: 'last_name',
      email: 'email@email.com',
      password: 'password',
      confirmPassword: 'password',
    };

    const expectedUser = {
      id: '1',
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
    };

    const response = await sut.handleRequest({
      body: { ...newUser },
    });

    expect(response.body).toEqual(expectedUser);
    expect(response.statusCode).toBe(201);
  });
});

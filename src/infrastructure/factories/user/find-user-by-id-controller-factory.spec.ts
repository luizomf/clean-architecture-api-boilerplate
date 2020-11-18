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
  it('should find a user with no errors', async () => {
    const { sut, findUserByIdUseCase } = sutFactory();
    const foundUser = {
      id: '1',
      first_name: 'first_name',
      last_name: 'last_name',
      email: 'email@email.com',
      password: 'password',
      confirmPassword: 'password',
    };
    jest.spyOn(findUserByIdUseCase, 'findById').mockResolvedValue(foundUser);

    const response = await sut.handleRequest({
      params: { id: '1' },
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ ...foundUser });
  });
});

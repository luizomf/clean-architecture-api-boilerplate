import { findUserByIdControllerFactory } from './find-user-by-id-controller-factory';

const sutFactory = () => {
  const {
    findUserByIdController: sut,
    findUserById,
  } = findUserByIdControllerFactory();

  return {
    sut,
    findUserById,
  };
};

describe('findUserByIdControllerFactory', () => {
  it('should find a user with no errors', async () => {
    const { sut, findUserById } = sutFactory();
    jest.spyOn(findUserById, 'findById').mockResolvedValueOnce({
      id: '1',
      first_name: 'first_name',
      last_name: 'last_name',
      email: 'email@email.com',
      password_hash: 'any_hash',
    });

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

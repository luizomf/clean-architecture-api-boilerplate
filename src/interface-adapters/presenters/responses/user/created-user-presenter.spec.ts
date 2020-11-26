import { CreatedUserPresenter } from './created-user-presenter';

describe('CreatedUserPresenter', () => {
  it('should return a user without password_hash', async () => {
    const sut = new CreatedUserPresenter();

    const bodyValue = {
      id: '1',
      email: 'email@email.com',
      first_name: 'first',
      last_name: 'last',
      password_hash: 'hash',
    };

    const expectedReturn = {
      id: '1',
      email: 'email@email.com',
      first_name: 'first',
      last_name: 'last',
    };

    const response = await sut.response(bodyValue);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(expectedReturn);
  });
});

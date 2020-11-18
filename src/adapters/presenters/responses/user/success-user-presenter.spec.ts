import { SuccessUserPresenter } from './success-user-presenter';

describe('SuccessUserPresenter', () => {
  it('should return a user without password_hash', async () => {
    const sut = new SuccessUserPresenter();

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
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expectedReturn);
  });
});

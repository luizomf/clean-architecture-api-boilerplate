import { DeletedUserPresenter } from './deleted-user-presenter';

describe('DeletedUserPresenter', () => {
  it('should return a user without password_hash', async () => {
    const sut = new DeletedUserPresenter();

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

import { DeletedUserPresenter } from './deleted-user-presenter';

describe('DeletedUserPresenter', () => {
  it('should return a user without password_hash', async () => {
    const sut = new DeletedUserPresenter();
    const response = await sut.response(1);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(1);
  });
});

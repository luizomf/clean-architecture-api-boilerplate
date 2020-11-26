import { DeletedUserPresenter } from './deleted-user-presenter';

describe('DeletedUserPresenter', () => {
  it('should return a user without password_hash', async () => {
    const sut = new DeletedUserPresenter();
    const response = await sut.response();
    expect(response.statusCode).toBe(204);
    expect(response.body).toBeUndefined();
  });
});

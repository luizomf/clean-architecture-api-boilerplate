import { UpdatedUserPresenter } from './updated-user-presenter';

describe('UpdatedUserPresenter', () => {
  it('should return a user without password_hash', async () => {
    const sut = new UpdatedUserPresenter();
    const response = await sut.response();
    expect(response.statusCode).toBe(204);
    expect(response.body).toBeUndefined();
  });
});

import { BCryptAdapter } from './bcrypt-adapter';

describe('BCryptAdapter', () => {
  it('should hash and compare the same password', async () => {
    const sut = new BCryptAdapter();
    const password = '123456';
    const hash = await sut.hash(password);
    const valid = await sut.compare(password, hash);
    expect(valid).toBe(true);
  });

  it('should invalidate wrong password', async () => {
    const sut = new BCryptAdapter();
    const password = '123456';
    const hash = await sut.hash(password);
    const valid = await sut.compare('654321', hash);
    expect(valid).toBe(false);
  });
});

import { JwtTokenAdapter } from './jwt-token-adapter';

const sutFactory = () => {
  const secret = process.env.JWT_SECRET || 'any-secret';
  const refreshSecret = process.env.JWT_SECRET_REFRESH || 'any-secret-refresh';

  const sut = new JwtTokenAdapter(secret, refreshSecret);

  return {
    sut,
    secret,
  };
};

describe('JwtTokenAdapter', () => {
  it('it should encrypt access token', async () => {
    const { sut } = sutFactory();
    const data = sut.signAccessToken('testing_data');
    expect(data).toBeTruthy();
  });

  it('it should decrypt access token', async () => {
    const { sut } = sutFactory();
    const inData = 'a_testing_string';
    const encrypted = sut.signAccessToken(inData);
    const decrypted = sut.verify(encrypted.token);
    expect(decrypted).toEqual(inData);
  });

  it('it should encrypt refresh token', async () => {
    const { sut } = sutFactory();
    const data = sut.signRefreshToken('a_refresh_string');
    expect(data).toBeTruthy();
  });

  it('it should decrypt refresh token', async () => {
    const { sut } = sutFactory();
    const inData = 'a_refresh_string';
    const encrypted = sut.signRefreshToken(inData);
    const decrypted = sut.verify(encrypted.token, false);
    expect(decrypted).toEqual(inData);
  });
});

import { JwtTokenAdapter } from './jwt-token-adapter';

const sutFactory = () => {
  const secret = process.env.JWT_SECRET || 'any-secret';
  const sut = new JwtTokenAdapter(secret);

  return {
    sut,
    secret,
  };
};

describe('JwtTokenAdapter', () => {
  it('it should encrypt data', async () => {
    const { sut } = sutFactory();
    const data = sut.sign('testing_data');
    expect(data).toBeTruthy();
  });

  it('it should decrypt data', async () => {
    const { sut } = sutFactory();
    const inData = 'a_testing_string';
    const encrypted = sut.sign(inData);
    const decrypted = sut.verify(encrypted);
    expect(decrypted).toEqual(inData);
  });
});

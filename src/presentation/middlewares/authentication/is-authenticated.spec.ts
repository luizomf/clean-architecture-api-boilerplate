/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtTokenAdapter } from '~/common/adapters/security/jwt-token-adapter';
import { IsAuthenticatedMiddleware } from './is-authenticated';

jest.mock('~/common/adapters/security/jwt-token-adapter');
const JwtTokenAdapterMock = JwtTokenAdapter as jest.Mock<JwtTokenAdapter>;

const sutFactory = () => {
  const jwtTokenMock = new JwtTokenAdapterMock() as jest.Mocked<JwtTokenAdapter>;
  const sut = new IsAuthenticatedMiddleware(jwtTokenMock);

  return {
    sut,
    jwtTokenMock,
  };
};

describe('IsAuthenticatedMiddleware', () => {
  it('should throw if request is invalid', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.handleRequest('' as any);
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('UnauthorizedError');
    expect(error.message).toBe('Invalid request');
  });

  it('should throw if token is invalid', async () => {
    const { sut, jwtTokenMock } = sutFactory();
    jwtTokenMock.verify.mockImplementationOnce(() => {
      throw new Error('Message');
    });

    let error;

    try {
      await sut.handleRequest({ headers: { authorization: 'abc' } });
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('UnauthorizedError');
    expect(error.message).toBe('Message');
  });

  it('should pass if jwtToken does not throw', async () => {
    const { sut, jwtTokenMock } = sutFactory();
    jwtTokenMock.verify.mockImplementationOnce(() => {
      return 'any_token';
    });
    const noValue = await sut.handleRequest({
      headers: { authorization: 'any' },
    });
    expect(noValue).toBeUndefined();
  });
});

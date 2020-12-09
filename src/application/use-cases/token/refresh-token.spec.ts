import { CreateTokenRepository } from '~/application/ports/repositories/token/create-token-repository';
import { FindTokenByTokenRepository } from '~/application/ports/repositories/token/find-token-by-token-repository';
import { JwtToken } from '~/application/ports/security/jwt-token';
import { RefreshToken } from './refresh-token';

const createTokenRepositoryMock: jest.Mocked<CreateTokenRepository> = {
  create: jest.fn(),
};

createTokenRepositoryMock.create.mockResolvedValue({
  id: '10',
  token: 'a_new_token',
  expires_in: 'a_new_date',
  user_id: '1',
});

const findByTokenRepositoryMock: jest.Mocked<FindTokenByTokenRepository> = {
  findByToken: jest.fn(),
};

findByTokenRepositoryMock.findByToken.mockResolvedValue({
  id: '1',
  token: 'a_token',
  expires_in: 'a_date',
  user_id: '1',
});

const jwtTokenAdapterMock: jest.Mocked<JwtToken> = {
  signAccessToken: jest.fn(),
  signRefreshToken: jest.fn(),
  verify: jest.fn(),
};

jwtTokenAdapterMock.verify.mockReturnValue('1');

jwtTokenAdapterMock.signAccessToken.mockReturnValue({
  token: 'access_token',
  expirationDate: new Date('2020-12-08T00:00:00-0300'),
});

jwtTokenAdapterMock.signRefreshToken.mockReturnValue({
  token: 'refresh_token',
  expirationDate: new Date('2020-12-18T00:00:00-0300'),
});

const sutFactory = () => {
  const sut = new RefreshToken(
    createTokenRepositoryMock,
    findByTokenRepositoryMock,
    jwtTokenAdapterMock,
  );

  return {
    sut,
  };
};

describe('RefreshToken', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw if refreshToken is empty', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.refresh('');
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
    expect(error.message).toBe('Empty refreshToken');
  });

  it('should call jwtTokenAdapter with correct token', async () => {
    const { sut } = sutFactory();
    await sut.refresh('a_token');
    expect(jwtTokenAdapterMock.verify).toHaveBeenCalledTimes(1);
    expect(jwtTokenAdapterMock.verify).toHaveBeenCalledWith('a_token', false);
  });

  it('should throw if jwtToken throws', async () => {
    const { sut } = sutFactory();
    jwtTokenAdapterMock.verify.mockImplementationOnce(() => {
      throw new Error('');
    });
    let error;

    try {
      await sut.refresh('a_token');
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('UnauthorizedError');
    expect(error.message).toBe('Invalid refresh token');
  });

  it('should call findByTokenRepository with correct token', async () => {
    const { sut } = sutFactory();

    await sut.refresh('a_token');
    expect(findByTokenRepositoryMock.findByToken).toHaveBeenCalledTimes(1);
    expect(findByTokenRepositoryMock.findByToken).toHaveBeenCalledWith(
      'a_token',
    );
  });

  it('should throw if findByTokenRepository throws', async () => {
    const { sut } = sutFactory();
    findByTokenRepositoryMock.findByToken.mockRejectedValueOnce(new Error());
    let error;

    try {
      await sut.refresh('a_token');
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('UnauthorizedError');
    expect(error.message).toBe('Invalid refresh token');
  });

  it('should throw if findByTokenRepository returns null', async () => {
    const { sut } = sutFactory();
    findByTokenRepositoryMock.findByToken.mockResolvedValueOnce(null);
    let error;

    try {
      await sut.refresh('a_token');
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('UnauthorizedError');
    expect(error.message).toBe('Invalid refresh token');
  });

  it('should call signAccessToken and signRefreshToken with correct userId', async () => {
    const { sut } = sutFactory();

    await sut.refresh('a_token');

    expect(jwtTokenAdapterMock.signAccessToken).toHaveBeenCalledTimes(1);
    expect(jwtTokenAdapterMock.signRefreshToken).toHaveBeenCalledTimes(1);

    expect(jwtTokenAdapterMock.signAccessToken).toHaveBeenCalledWith('1');
    expect(jwtTokenAdapterMock.signRefreshToken).toHaveBeenCalledWith('1');
  });

  it('should call createTokenRepository correct values', async () => {
    const { sut } = sutFactory();

    await sut.refresh('a_token');

    expect(createTokenRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(createTokenRepositoryMock.create).toHaveBeenLastCalledWith({
      expires_in: '2020-12-18 00:00:00',
      token: 'refresh_token',
      user_id: '1',
    });
  });

  it('should throw if createTokenRepository throws', async () => {
    const { sut } = sutFactory();
    createTokenRepositoryMock.create.mockRejectedValueOnce(new Error());
    let error;

    try {
      await sut.refresh('a_token');
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('UnauthorizedError');
    expect(error.message).toBe('Invalid refresh token');
  });

  it('should return a new token and refreshToken if everything is ok', async () => {
    const { sut } = sutFactory();
    const resolved = await sut.refresh('a_token');
    expect(resolved.token).toBe('access_token');
    expect(resolved.refreshToken).toBe('refresh_token');
  });
});

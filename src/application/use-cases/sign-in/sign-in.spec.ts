/* eslint-disable @typescript-eslint/no-explicit-any */
import { FindUserByEmailRepository } from '~/application/ports/repositories/user/find-user-by-email-repository';
import { PasswordHashing } from '~/application/ports/security/password-hashing';
import { ValidationComposite } from '~/application/ports/validation/validation-composite';
import { JwtTokenAdapter } from '~/common/adapters/security/jwt-token-adapter';
import { User } from '~/domain/models/user/user';
import { TokenSqlRepository } from '~/infrastructure/repositories/token/sql/token-sql-repository';
import { SignIn } from './sign-in';

jest.mock('~/infrastructure/repositories/token/sql/token-sql-repository');
jest.mock('~/common/adapters/security/jwt-token-adapter');

const TokenSqlRepositoryMock = TokenSqlRepository as jest.Mock<TokenSqlRepository>;
const JwtTokenAdapterMock = JwtTokenAdapter as jest.Mock<JwtTokenAdapter>;

const sutFactory = () => {
  const repositoryMock = repositoryMockFactory();
  const passwordHashingMock = passwordHashingMockFactory();
  const jwtTokenMock = jwtTokenMockFactory();
  const tokenSqlRepository = new TokenSqlRepositoryMock();
  const validationMock = validationMockFactory();
  const sut = new SignIn(
    repositoryMock,
    passwordHashingMock,
    jwtTokenMock,
    tokenSqlRepository,
    validationMock,
  );

  return {
    sut,
    repositoryMock,
    passwordHashingMock,
    jwtTokenMock,
    validationMock,
    tokenSqlRepository,
  };
};

const sutFactoryNoValidations = () => {
  const repositoryMock = repositoryMockFactory();
  const passwordHashingMock = passwordHashingMockFactory();
  const jwtTokenMock = jwtTokenMockFactory();
  const tokenSqlRepository = new TokenSqlRepositoryMock();
  const validationMock = validationMockFactory();
  const sut = new SignIn(
    repositoryMock,
    passwordHashingMock,
    jwtTokenMock,
    tokenSqlRepository,
  );
  return {
    sut,
    repositoryMock,
    passwordHashingMock,
    jwtTokenMock,
    validationMock,
    tokenSqlRepository,
  };
};

const userMockFactory = (): User => {
  return {
    id: '1',
    first_name: 'first1',
    last_name: 'last1',
    email: 'email1@email.com',
    password_hash: 'any_hash1',
  };
};

const futureDateFactory = () => {
  return new Date(new Date().getTime() + 3600 * 1000);
};

const tokenMockFactory = (token: string) => {
  return {
    token,
    expirationDate: futureDateFactory(),
  };
};

const jwtTokenMockFactory = () => {
  const jwtTokenMock = new JwtTokenAdapterMock() as jest.Mocked<JwtTokenAdapter>;

  jwtTokenMock.signAccessToken.mockReturnValue(tokenMockFactory('any_token'));
  jwtTokenMock.signRefreshToken.mockReturnValue(
    tokenMockFactory('any_refresh_token'),
  );

  return jwtTokenMock;
};

const repositoryMockFactory = () => {
  class RepositoryMock implements FindUserByEmailRepository {
    async findByEmail(_email: string): Promise<User | null> {
      return userMockFactory();
    }
  }

  return new RepositoryMock();
};

const passwordHashingMockFactory = () => {
  class PasswordHashingMock implements PasswordHashing {
    async hash(_password: string): Promise<string> {
      return 'hashed';
    }

    async compare(_password: string, _hash: string): Promise<boolean> {
      return true;
    }
  }

  return new PasswordHashingMock();
};

const validationMockFactory = () => {
  class ValidationMock extends ValidationComposite<any> {
    async validate(_request: any): Promise<void | never> {}
  }

  return new ValidationMock();
};

describe('SignIn', () => {
  it('should call validation with correct values', async () => {
    const { sut, validationMock } = sutFactory();
    const validationSpy = jest.spyOn(validationMock, 'validate');

    await sut.verify({ email: 'email@email.com', password: 'any_pass' });

    expect(validationSpy).toHaveBeenCalledTimes(1);
    expect(validationSpy).toHaveBeenCalledWith({
      email: 'email@email.com',
      password: 'any_pass',
    });
  });

  it('should throw if validation throws', async () => {
    const { sut, validationMock } = sutFactory();
    jest.spyOn(validationMock, 'validate').mockRejectedValue(new Error());
    let error;

    try {
      await sut.verify({ email: 'email@email.com', password: 'any_pass' });
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('Error');
    expect(error.message).toBe('');
  });

  it('should not call validation if there is no validation set', async () => {
    const { sut, validationMock } = sutFactoryNoValidations();
    const validationSpy = jest.spyOn(validationMock, 'validate');

    await sut.verify({ email: 'email@email.com', password: 'any_pass' });

    expect(validationSpy).toHaveBeenCalledTimes(0);
  });

  it('should call repository with user email', async () => {
    const { sut, repositoryMock } = sutFactory();
    const repositorySpy = jest.spyOn(repositoryMock, 'findByEmail');

    await sut.verify({ email: 'email@email.com', password: 'any_pass' });

    expect(repositorySpy).toHaveBeenCalledTimes(1);
    expect(repositorySpy).toHaveBeenCalledWith('email@email.com');
  });

  it('should throw if repository throws', async () => {
    const { sut, repositoryMock } = sutFactory();
    jest.spyOn(repositoryMock, 'findByEmail').mockRejectedValue(new Error());
    let error;

    try {
      await sut.verify({ email: 'email@email.com', password: 'any_pass' });
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('Error');
    expect(error.message).toBe('');
  });

  it('should throw if user is not found', async () => {
    const { sut, repositoryMock } = sutFactory();
    jest.spyOn(repositoryMock, 'findByEmail').mockResolvedValueOnce(null);
    let error;

    try {
      await sut.verify({ email: 'email@email.com', password: 'any_pass' });
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('NotFoundError');
    expect(error.message).toBe('User not found');
  });

  it('should throw if user has no password_hash', async () => {
    const { sut, repositoryMock } = sutFactory();
    jest.spyOn(repositoryMock, 'findByEmail').mockResolvedValueOnce({
      ...userMockFactory(),
      password_hash: '',
    });
    let error;

    try {
      await sut.verify({ email: 'email@email.com', password: 'any_pass' });
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('InternalServerError');
    expect(error.message).toBe('User has no password');
  });

  it('should call passwordHashing with password and hash', async () => {
    const { sut, passwordHashingMock } = sutFactory();
    const passwordHashingSpy = jest.spyOn(passwordHashingMock, 'compare');

    await sut.verify({ email: 'email@email.com', password: 'received_pass' });

    expect(passwordHashingSpy).toHaveBeenCalledTimes(1);
    expect(passwordHashingSpy).toHaveBeenCalledWith(
      'received_pass',
      'any_hash1',
    );
  });

  it('should call passwordHashing with password and hash', async () => {
    const { sut, passwordHashingMock } = sutFactory();
    jest.spyOn(passwordHashingMock, 'compare').mockResolvedValue(false);
    let error;

    try {
      await sut.verify({ email: 'email@email.com', password: 'any_pass' });
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('UnauthorizedError');
    expect(error.message).toBe('Invalid credentials');
  });

  it('should call jwtTokenMock with correct values', async () => {
    const { sut, tokenSqlRepository, jwtTokenMock } = sutFactory();
    const anyDate = new Date('2020-01-01T00:00:00-0300');

    jwtTokenMock.signAccessToken.mockReturnValue({
      token: 'any',
      expirationDate: anyDate,
    });

    jwtTokenMock.signRefreshToken.mockReturnValue({
      token: 'any',
      expirationDate: anyDate,
    });

    const data = { email: 'email@email.com', password: 'any_pass' };

    await sut.verify(data);

    expect(tokenSqlRepository.create).toHaveBeenCalledWith({
      token: 'any',
      expires_in: '2020-01-01 00:00:00',
      user_id: '1',
    });
  });

  it('should sign a JWT Token for the user', async () => {
    const { sut, passwordHashingMock } = sutFactory();
    jest.spyOn(passwordHashingMock, 'compare').mockResolvedValue(true);
    const token = await sut.verify({
      email: 'email@email.com',
      password: 'any_pass',
    });
    expect(token).toEqual({
      token: 'any_token',
      refreshToken: 'any_refresh_token',
    });
  });
});

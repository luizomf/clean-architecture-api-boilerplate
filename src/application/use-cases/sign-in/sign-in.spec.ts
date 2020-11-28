/* eslint-disable @typescript-eslint/no-explicit-any */
import { FindUserByEmailRepository } from '~/application/ports/repositories/user/find-user-by-email-repository';
import { JwtToken } from '~/application/ports/security/jwt-token';
import { PasswordHashing } from '~/application/ports/security/password-hashing';
import { ValidationComposite } from '~/application/ports/validation/validation-composite';
import { User } from '~/domain/user/entities/user';
import { SignIn } from './sign-in';

const sutFactory = () => {
  const repositoryMock = repositoryMockFactory();
  const passwordHashingMock = passwordHashingMockFactory();
  const jwtTokenMock = jwtTokenMockFactory();
  const validationMock = validationMockFactory();
  const sut = new SignIn(
    repositoryMock,
    passwordHashingMock,
    jwtTokenMock,
    validationMock,
  );

  return {
    sut,
    repositoryMock,
    passwordHashingMock,
    jwtTokenMock,
    validationMock,
  };
};

const sutFactoryNoValidations = () => {
  const repositoryMock = repositoryMockFactory();
  const passwordHashingMock = passwordHashingMockFactory();
  const jwtTokenMock = jwtTokenMockFactory();
  const validationMock = validationMockFactory();
  const sut = new SignIn(repositoryMock, passwordHashingMock, jwtTokenMock);

  return {
    sut,
    repositoryMock,
    passwordHashingMock,
    jwtTokenMock,
    validationMock,
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

const jwtTokenMockFactory = () => {
  class JwtTokenMock implements JwtToken {
    sign(_userId: string): string {
      return 'a_jwt_token';
    }

    verify(_jwtToken: string): string {
      return 'a_value';
    }
  }

  return new JwtTokenMock();
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

    expect(error.name).toBe('RequestValidationError');
    expect(error.message).toBe('Invalid credentials');
  });

  it('should sign a JWT Token for the user', async () => {
    const { sut, passwordHashingMock } = sutFactory();
    jest.spyOn(passwordHashingMock, 'compare').mockResolvedValue(true);
    const token = await sut.verify({
      email: 'email@email.com',
      password: 'any_pass',
    });
    expect(token).toBe('a_jwt_token');
  });
});

import { UserExistsError } from '~/application/errors/user-exists-error';
import { CreateUserRepository } from '~/application/ports/repositories/create-user-repository';
import { PasswordHashing } from '~/application/ports/security/password-hashing';
import { CreateUserRequestWithPasswordHash } from '~/application/ports/user/create-user-request-model';
import { FindUserByEmailUseCase } from '~/application/ports/user/find-user-by-email-use-case';
import { User } from '~/domain/user/user';
import { CreateUser } from './create-user';

const sutFactory = () => {
  const userRequestMock = userRequestFactoryWithPassword();
  const createUserRepositoryMock = createUserRepositoryMockFactory();
  const findUserByEmailUseCaseMock = createFindUserByEmailUseCaseMock();
  const passwordHashingMock = passwordHashingMockFactory();
  const sut = new CreateUser(
    createUserRepositoryMock,
    findUserByEmailUseCaseMock,
    passwordHashingMock,
  );

  return {
    sut,
    userRequestMock,
    createUserRepositoryMock,
    findUserByEmailUseCaseMock,
  };
};

const passwordHashingMockFactory = () => {
  class PasswordHashingMock implements PasswordHashing {
    async hash(): Promise<string> {
      return 'hash';
    }

    async compare(): Promise<boolean> {
      return true;
    }
  }

  return new PasswordHashingMock();
};

const createUserRepositoryMockFactory = (): CreateUserRepository => {
  class CreateUserRepositoryMock implements CreateUserRepository {
    async create(
      _requestModel: CreateUserRequestWithPasswordHash,
    ): Promise<User | never> {
      return {
        id: '1',
        first_name: 'a_first_name',
        last_name: 'a_last_name',
        email: 'an_email@email.com',
      };
    }
  }

  return new CreateUserRepositoryMock();
};

const createFindUserByEmailUseCaseMock = () => {
  class FindUserByEmailUseCaseMock implements FindUserByEmailUseCase {
    async find(_email: string): Promise<User | null> {
      return null;
    }
  }

  return new FindUserByEmailUseCaseMock();
};

const userRequestFactoryWithPassword = () => {
  return {
    body: {
      first_name: 'a_first_name',
      last_name: 'a_last_name',
      email: 'an_email@email.com',
      password: 'a_password',
      confirmPassword: 'a_password',
    },
  };
};

const userRequestFactoryWithHash = () => {
  return {
    body: {
      first_name: 'a_first_name',
      last_name: 'a_last_name',
      email: 'an_email@email.com',
      password_hash: 'hash',
    },
  };
};

const userResponseFactory = () => {
  return {
    id: '1',
    first_name: 'a_first_name',
    last_name: 'a_last_name',
    email: 'an_email@email.com',
  };
};

describe('Create User', () => {
  it('should call user repository with correct values', async () => {
    const { sut, userRequestMock, createUserRepositoryMock } = sutFactory();
    const createUserRepositorySpy = jest.spyOn(
      createUserRepositoryMock,
      'create',
    );

    await sut.create(userRequestMock.body);
    expect(createUserRepositorySpy).toHaveBeenCalledTimes(1);
    expect(createUserRepositorySpy).toHaveBeenCalledWith(
      userRequestFactoryWithHash().body,
    );
  });

  it('should throw if user already exist', async () => {
    const { sut, userRequestMock, findUserByEmailUseCaseMock } = sutFactory();
    jest
      .spyOn(findUserByEmailUseCaseMock, 'find')
      .mockResolvedValue(userResponseFactory());
    return sut.create(userRequestMock.body).catch((error) => {
      return expect(error).toEqual(new UserExistsError('User already created'));
    });
  });

  it('should return user if user is created', async () => {
    const { sut, userRequestMock } = sutFactory();
    const expectedUser = userResponseFactory();
    return sut.create(userRequestMock.body).then((user) => {
      expect(user).toEqual(expectedUser);
    });
  });
});

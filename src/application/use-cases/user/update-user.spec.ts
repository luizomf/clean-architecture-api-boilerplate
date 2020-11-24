import { FindUserByIdRepository } from '~/application/ports/repositories/find-user-by-id-repository';
import { UpdateUserRepository } from '~/application/ports/repositories/update-user-repository';
import { PasswordHashing } from '~/application/ports/security/password-hashing';
import { UpdateUserRequestModel } from '~/application/ports/user/models/update-user-request-model';
import { User } from '~/domain/user/user';
import { UpdateUser } from './update-user';

const sutFactory = () => {
  const findUserByIdRepositoryMock = findUserByIdRepositoryMockFactory();
  const updateUserRepositoryMock = updateUserRepositoryMockFactory();
  const passwordHashingMock = passwordHashingMockFactory();
  const sut = new UpdateUser(
    updateUserRepositoryMock,
    findUserByIdRepositoryMock,
    passwordHashingMock,
  );

  return {
    sut,
    findUserByIdRepositoryMock,
    updateUserRepositoryMock,
    passwordHashingMock,
  };
};

const findUserByIdRepositoryMockFactory = () => {
  class FindUserByIdRepositoryMock implements FindUserByIdRepository {
    async findById(_id: string): Promise<User | null> {
      return {
        id: '1',
        email: 'email@email.com',
        first_name: 'first_name',
        last_name: 'last_name',
        password_hash: 'any_hash',
      };
    }
  }

  return new FindUserByIdRepositoryMock();
};

const passwordHashingMockFactory = () => {
  class PasswordHashingMock implements PasswordHashing {
    async hash(_string: string) {
      return 'hashed';
    }

    async compare(_string: string, _hash: string) {
      return true;
    }
  }

  return new PasswordHashingMock();
};

const updateUserRepositoryMockFactory = () => {
  class UpdateUserRepositoryMock implements UpdateUserRepository {
    async update(
      _id: string,
      _requestModel: UpdateUserRequestModel,
    ): Promise<User | never> {
      return {
        id: '1',
        email: 'email@email.com',
        first_name: 'first_name',
        last_name: 'last_name',
        password_hash: 'any_hash',
      };
    }
  }

  return new UpdateUserRepositoryMock();
};

describe('UpdateUser', () => {
  it('should call findUserByIdRepository with correct values', async () => {
    const { sut, findUserByIdRepositoryMock } = sutFactory();
    const findUserByIdRepositorySpy = jest.spyOn(
      findUserByIdRepositoryMock,
      'findById',
    );
    await sut.update('1', { first_name: 'new_first_name' });
    expect(findUserByIdRepositorySpy).toHaveBeenCalledTimes(1);
    expect(findUserByIdRepositorySpy).toHaveBeenCalledWith('1');
  });

  it('should throw if findUserByIdRepository throws', async () => {
    const { sut, findUserByIdRepositoryMock } = sutFactory();
    jest
      .spyOn(findUserByIdRepositoryMock, 'findById')
      .mockRejectedValueOnce(new Error('Any Error'));

    let error;

    try {
      await sut.update('1', { first_name: 'new_first_name' });
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('Error');
    expect(error.message).toBe('Any Error');
  });

  it('should throw if user do not exist', async () => {
    const { sut, findUserByIdRepositoryMock } = sutFactory();
    jest.spyOn(findUserByIdRepositoryMock, 'findById').mockResolvedValue(null);
    let error;

    try {
      await sut.update('1', { first_name: 'new_first_name' });
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('NotFoundError');
    expect(error.message).toBe('User does not exist');
  });

  it('should call updateUserRepository with correct values', async () => {
    const { sut, updateUserRepositoryMock } = sutFactory();
    const updateUserRepositorySpy = jest.spyOn(
      updateUserRepositoryMock,
      'update',
    );
    await sut.update('1', { first_name: 'new_first_name' });
    expect(updateUserRepositorySpy).toHaveBeenCalledTimes(1);
    expect(updateUserRepositorySpy).toHaveBeenCalledWith('1', {
      first_name: 'new_first_name',
    });
  });

  it('should throw if updateUserRepository throws', async () => {
    const { sut, updateUserRepositoryMock } = sutFactory();
    jest
      .spyOn(updateUserRepositoryMock, 'update')
      .mockRejectedValueOnce(new Error('Any Error'));

    let error;

    try {
      await sut.update('1', { first_name: 'new_first_name' });
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('Error');
    expect(error.message).toBe('Any Error');
  });

  it('should return updated user if everything is OK', async () => {
    const { sut, updateUserRepositoryMock } = sutFactory();
    jest.spyOn(updateUserRepositoryMock, 'update').mockResolvedValue({
      id: '1',
      first_name: 'new_first_name',
      last_name: 'last',
      email: 'email@email.com',
      password_hash: 'any_hash',
    });

    const response = await sut.update('1', { first_name: 'new_first_name' });

    expect(response.id).toBe('1');
    expect(response.first_name).toBe('new_first_name');
    expect(response.last_name).toBe('last');
    expect(response.email).toBe('email@email.com');
    expect(response.password_hash).toBe('any_hash');
  });

  it('should hash password if password is received', async () => {
    const { sut, updateUserRepositoryMock, passwordHashingMock } = sutFactory();
    const updateUserRepositorySpy = jest.spyOn(
      updateUserRepositoryMock,
      'update',
    );
    const passwordHashingSpy = jest
      .spyOn(passwordHashingMock, 'hash')
      .mockResolvedValueOnce('hashed');

    await sut.update('1', { password: 'password' });

    expect(passwordHashingSpy).toBeCalledTimes(1);
    expect(passwordHashingSpy).toHaveBeenCalledWith('password');

    expect(updateUserRepositorySpy).toBeCalledTimes(1);
    expect(updateUserRepositorySpy).toHaveBeenCalledWith('1', {
      password_hash: 'hashed',
    });
  });
});

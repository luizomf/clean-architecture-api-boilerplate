/* eslint-disable @typescript-eslint/no-explicit-any */
import { FindAllUsersRepository } from '~/application/ports/repositories/user/find-all-users-repository';
import { FindAllUsersRequestModel } from '~/domain/use-cases/user/find-all-users-use-case';
import { ValidationComposite } from '~/application/ports/validation/validation-composite';
import { User } from '~/domain/models/user/user';
import { FindAllUsers } from './find-all-users';

const sutFactory = () => {
  const findAllUsersRepositoryMock = findAllUsersRepositoryMockFactory();
  const validationMock = validationMockFactory();
  const sut = new FindAllUsers(findAllUsersRepositoryMock, validationMock);

  return {
    sut,
    findAllUsersRepositoryMock,
    validationMock,
  };
};

const findAllUsersRepositoryMockFactory = () => {
  class FindAllUsersRepositoryMock implements FindAllUsersRepository {
    async find(..._any: any): Promise<User[]> {
      return [
        {
          id: '1',
          first_name: 'first1',
          last_name: 'last1',
          email: 'email1@email.com',
          password_hash: 'any_hash1',
        },
        {
          id: '2',
          first_name: 'first2',
          last_name: 'last2',
          email: 'email2@email.com',
          password_hash: 'any_hash2',
        },
        {
          id: '3',
          first_name: 'first3',
          last_name: 'last3',
          email: 'email3@email.com',
          password_hash: 'any_hash3',
        },
        {
          id: '4',
          first_name: 'first4',
          last_name: 'last4',
          email: 'email4@email.com',
          password_hash: 'any_hash4',
        },
      ];
    }
  }

  return new FindAllUsersRepositoryMock();
};

const validationMockFactory = () => {
  class ValidationMock extends ValidationComposite<FindAllUsersRequestModel> {
    async validate(_request: FindAllUsersRequestModel): Promise<void | never> {}
  }

  return new ValidationMock();
};

describe('FindAllUsers', () => {
  it('should call validation with correct values', async () => {
    const { sut, validationMock } = sutFactory();
    const validationSpy = jest.spyOn(validationMock, 'validate');
    await sut.findAll({ order: 'asc', limit: 200, offset: 1000 });
    expect(validationSpy).toHaveBeenCalledTimes(1);
    expect(validationSpy).toHaveBeenCalledWith({
      order: 'asc',
      limit: 200,
      offset: 1000,
    });
  });

  it('should call findAllUsersRepository with correct values', async () => {
    const { sut, findAllUsersRepositoryMock } = sutFactory();
    const findAllUsersRepositorySpy = jest.spyOn(
      findAllUsersRepositoryMock,
      'find',
    );
    await sut.findAll({ order: 'desc', limit: 2, offset: 0 });
    expect(findAllUsersRepositorySpy).toHaveBeenCalledTimes(1);
    expect(findAllUsersRepositorySpy).toHaveBeenCalledWith('desc', 2, 0);

    await sut.findAll({ order: 'desc' });
    expect(findAllUsersRepositorySpy).toHaveBeenCalledWith('desc', 100, 0);

    await sut.findAll({ limit: 10 });
    expect(findAllUsersRepositorySpy).toHaveBeenCalledWith('desc', 10, 0);

    await sut.findAll({ offset: 10 });
    expect(findAllUsersRepositorySpy).toHaveBeenCalledWith('desc', 100, 10);
  });

  it('should return an array of users', async () => {
    const { sut } = sutFactory();
    const users = await sut.findAll();
    expect(users.length).toBeGreaterThan(0);
  });
});

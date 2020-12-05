/* eslint-disable @typescript-eslint/no-explicit-any */
import { NotFoundError } from '~/application/errors/not-found-error';
import { FindUserByIdRepository } from '~/application/ports/repositories/user/find-user-by-id-repository';
import { ValidationComposite } from '~/application/ports/validation/validation-composite';
import { User } from '~/domain/models/user/user';
import { FindUserById } from './find-user-by-id';

const sutFactory = () => {
  const repository = findUserRepositoryMockFactory();
  const validationMock = validationMockFactory();
  const sut = new FindUserById(repository, validationMock);

  return {
    sut,
    repository,
  };
};

const findUserRepositoryMockFactory = () => {
  class FindUserByIdRepositoryMock implements FindUserByIdRepository {
    async findById(..._any: any): Promise<User | null> {
      return userMockFactory()[0];
    }
  }

  const findUserByIdRepositoryMock = new FindUserByIdRepositoryMock();
  return findUserByIdRepositoryMock;
};

const userMockFactory = (): User[] => {
  return [
    {
      id: '1',
      email: 'user@email.com',
      first_name: 'user first name',
      last_name: 'user last name',
    },
  ];
};

const validationMockFactory = () => {
  class ValidationMock extends ValidationComposite<string> {
    async validate(_id: string): Promise<void | never> {}
  }

  return new ValidationMock();
};

describe('FindUserById Usecase', () => {
  it('should throw NotFoundError if no user is found', async () => {
    const { sut, repository } = sutFactory();
    jest.spyOn(repository, 'findById').mockResolvedValue(null);
    return sut.findById('abc').catch((error) => {
      return expect(error).toEqual(new NotFoundError('User not found'));
    });
  });

  it('should return a user if found', async () => {
    const { sut, repository } = sutFactory();
    const userMock = userMockFactory()[0];
    jest.spyOn(repository, 'findById').mockResolvedValueOnce(userMock);

    const response = await sut.findById('22');
    expect(response).toEqual(userMock);
  });

  it('should call user repository with correct values', async () => {
    const { sut, repository } = sutFactory();
    const repositorySpy = jest.spyOn(repository, 'findById');

    await sut.findById('22');
    expect(repositorySpy).toHaveBeenCalledWith('22');
    expect(repositorySpy).toHaveBeenCalledTimes(1);
  });
});

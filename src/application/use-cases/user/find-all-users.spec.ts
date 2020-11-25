import { FindAllUsersRepository } from '~/application/ports/repositories/find-all-users-repository';
import { User } from '~/domain/user/user';
import { FindAllUsers } from './find-all-users';

const sutFactory = () => {
  const findAllUsersRepositoryMock = findAllUsersRepositoryMockFactory();
  const sut = new FindAllUsers(findAllUsersRepositoryMock);

  return {
    sut,
    findAllUsersRepositoryMock,
  };
};

const findAllUsersRepositoryMockFactory = () => {
  class FindAllUsersRepositoryMock implements FindAllUsersRepository {
    async find(
      _order: 'asc' | 'desc',
      _limit: number,
      _offset: number,
    ): Promise<User[]> {
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

describe('FindAllUsers', () => {
  it('should call findAllUsersRepository with correct values', async () => {
    const { sut, findAllUsersRepositoryMock } = sutFactory();
    const findAllUsersRepositorySpy = jest.spyOn(
      findAllUsersRepositoryMock,
      'find',
    );
    await sut.findAll('desc', 2, 0);
    expect(findAllUsersRepositorySpy).toHaveBeenCalledTimes(1);
    expect(findAllUsersRepositorySpy).toHaveBeenCalledWith('desc', 2, 0);
  });

  it('should return an array of users', async () => {
    const { sut } = sutFactory();
    const users = await sut.findAll();
    expect(users.length).toBeGreaterThan(0);
  });
});

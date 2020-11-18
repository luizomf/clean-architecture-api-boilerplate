import { FindUserByEmailRepository } from '~/application/ports/repositories/find-user-by-email-repository';
import { User } from '~/domain/user/user';
import { FindUserByEmail } from './find-user-by-email';

const sutFactory = () => {
  const findUserByEmailRepositoryMock = findUserByEmailRepositoryMockFactory();
  const sut = new FindUserByEmail(findUserByEmailRepositoryMock);

  return {
    sut,
    findUserByEmailRepositoryMock,
  };
};

const findUserByEmailRepositoryMockFactory = () => {
  class FindUserByEmailRepositoryMock implements FindUserByEmailRepository {
    async findByEmail(_email: string): Promise<User | null> {
      return userResponseFactory();
    }
  }

  return new FindUserByEmailRepositoryMock();
};

const userResponseFactory = () => {
  return {
    id: '1',
    email: 'an_email@email.com',
    first_name: 'a_first_name',
    last_name: 'a_last_name',
  };
};

describe('FindUserByEmail', () => {
  it('should return a user if found', async () => {
    const { sut } = sutFactory();
    return sut.findByEmail('an_email@email.com').then((user) => {
      return expect(user).toEqual(userResponseFactory());
    });
  });

  it('should return null if no user is found', async () => {
    const { sut, findUserByEmailRepositoryMock } = sutFactory();
    jest
      .spyOn(findUserByEmailRepositoryMock, 'findByEmail')
      .mockResolvedValue(null);
    return sut.findByEmail('an_email@email.com').then((user) => {
      return expect(user).toBeNull();
    });
  });
});

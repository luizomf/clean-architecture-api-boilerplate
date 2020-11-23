import { DeleteUserByIdRepository } from '~/application/ports/repositories/delete-user-by-id-repository';
import { FindUserByIdRepository } from '~/application/ports/repositories/find-user-by-id-repository';
import { User } from '~/domain/user/user';
import { db } from '~/infrastructure/knex/connection';
import { DeleteUserById } from './delete-user-by-id';

const sutFactory = () => {
  const findUserByIdRepositoryMock = findUserByIdRepositoryMockFactory();
  const deleteUserByIdRepositoryMock = deleteUserByIdRepositoryMockFactory();
  const sut = new DeleteUserById(
    deleteUserByIdRepositoryMock,
    findUserByIdRepositoryMock,
  );

  return {
    sut,
    deleteUserByIdRepositoryMock,
    findUserByIdRepositoryMock,
  };
};

const findUserByIdRepositoryMockFactory = () => {
  class FindUserByIdRepositoryMock implements FindUserByIdRepository {
    async findById(_id: string): Promise<User | null> {
      return {
        id: '1',
        first_name: 'first',
        last_name: 'last',
        email: 'email@email.com',
        password_hash: 'any_hash',
      };
    }
  }

  return new FindUserByIdRepositoryMock();
};

const deleteUserByIdRepositoryMockFactory = () => {
  class DeleteUserByIdRepositoryMock implements DeleteUserByIdRepository {
    async deleteById(_id: string): Promise<User | never> {
      return {
        id: '1',
        first_name: 'first',
        last_name: 'last',
        email: 'email@email.com',
        password_hash: 'any_hash',
      };
    }
  }

  return new DeleteUserByIdRepositoryMock();
};

describe('DeleteUserById', () => {
  beforeAll(async () => {
    await db.migrate.latest({ directory: process.env.MIGRATIONS });
    await db<User>('users').insert({
      first_name: 'first',
      last_name: 'last',
      email: 'email@email.com',
      password_hash: 'any_hash',
    });
  });

  afterAll(async () => {
    await db.destroy();
  });

  it('should delete a user if exists', async () => {
    const { sut } = sutFactory();
    const deletedUser = await sut.deleteById('1');
    expect(deletedUser.id).toBe('1');
  });

  it('should throw if user does not exist', async () => {
    const { sut, findUserByIdRepositoryMock } = sutFactory();
    jest
      .spyOn(findUserByIdRepositoryMock, 'findById')
      .mockResolvedValueOnce(null);
    let error;

    try {
      await sut.deleteById('abc');
    } catch (e) {
      error = e;
    }

    expect(error.statusCode).toBe(404);
  });
});

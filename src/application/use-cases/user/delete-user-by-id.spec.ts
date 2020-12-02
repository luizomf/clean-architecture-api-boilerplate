import { DeleteUserByIdRepository } from '~/application/ports/repositories/user/delete-user-by-id-repository';
import { FindUserByIdRepository } from '~/application/ports/repositories/user/find-user-by-id-repository';
import { ValidationComposite } from '~/application/ports/validation/validation-composite';
import { User } from '~/domain/models/user/user';
import { DeleteUserById } from './delete-user-by-id';

const sutFactory = () => {
  const findUserByIdRepositoryMock = findUserByIdRepositoryMockFactory();
  const deleteUserByIdRepositoryMock = deleteUserByIdRepositoryMockFactory();
  const validationMock = validationMockFactory();
  const sut = new DeleteUserById(
    deleteUserByIdRepositoryMock,
    findUserByIdRepositoryMock,
    validationMock,
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
    async deleteById(_id: string): Promise<number | never> {
      return 1;
    }
  }

  return new DeleteUserByIdRepositoryMock();
};

const validationMockFactory = () => {
  class ValidationMock extends ValidationComposite<string> {
    async validate(_id: string): Promise<void | never> {}
  }

  return new ValidationMock();
};

describe('DeleteUserById', () => {
  it('should call findUserByIdRepository with correct values', async () => {
    const { sut, findUserByIdRepositoryMock } = sutFactory();
    const findUserByIdRepositorySpy = jest.spyOn(
      findUserByIdRepositoryMock,
      'findById',
    );
    await sut.deleteById('20');
    expect(findUserByIdRepositorySpy).toHaveBeenCalledTimes(1);
    expect(findUserByIdRepositorySpy).toHaveBeenCalledWith('20');
  });

  it('should call deleteUserByIdRepository with correct values', async () => {
    const { sut, deleteUserByIdRepositoryMock } = sutFactory();
    const deleteUserByIdRepositorySpy = jest.spyOn(
      deleteUserByIdRepositoryMock,
      'deleteById',
    );
    await sut.deleteById('20');
    expect(deleteUserByIdRepositorySpy).toHaveBeenCalledTimes(1);
    expect(deleteUserByIdRepositorySpy).toHaveBeenCalledWith('20');
  });

  it('should delete a user if exists', async () => {
    const { sut } = sutFactory();
    const numberOfRows = await sut.deleteById('1');
    expect(numberOfRows).toBe(1);
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

  it('should throw deleteUserByIdRepository throws', async () => {
    const { sut, deleteUserByIdRepositoryMock } = sutFactory();
    jest
      .spyOn(deleteUserByIdRepositoryMock, 'deleteById')
      .mockRejectedValue(new Error());

    let error;

    try {
      await sut.deleteById('abc');
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('Error');
  });
});

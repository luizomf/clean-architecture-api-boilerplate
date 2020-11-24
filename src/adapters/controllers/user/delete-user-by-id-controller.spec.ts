/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestValidationError } from '~/application/errors/request-validation-error';
import { Presenter } from '~/application/ports/presenters/presenter';
import { DeleteUserByIdUseCase } from '~/application/ports/user/delete-user-by-id-use-case';
import { ValidationComposite } from '~/application/ports/validators/validation-composite';
import { User } from '~/domain/user/user';
import { DeleteUserByIdController } from './delete-user-by-id-controller';

const sutFactory = () => {
  const deleteUserByIdUseCaseMock = deleteUserByIdUseCaseMockFactory();
  const validationMock = validationMockFactory();
  const presenter = presenterMockFactory();
  const sut = new DeleteUserByIdController(
    deleteUserByIdUseCaseMock,
    validationMock,
    presenter,
  );

  return {
    sut,
    validationMock,
    deleteUserByIdUseCaseMock,
  };
};

const presenterMockFactory = () => {
  class PresenterMock implements Presenter {
    async response(_user: any) {
      return {
        statusCode: 200,
        body: {
          id: '1000',
          first_name: 'first',
          last_name: 'last',
          email: 'email@email.com',
        },
      };
    }
  }

  return new PresenterMock();
};

const validationMockFactory = () => {
  class Validation extends ValidationComposite {
    async validate(_any: any) {
      return undefined;
    }
  }

  return new Validation();
};

const deleteUserByIdUseCaseMockFactory = () => {
  class DeleteUserByIdUseCaseMock implements DeleteUserByIdUseCase {
    async deleteById(_id: string): Promise<User | never> {
      return {
        id: '1',
        first_name: 'first',
        last_name: 'last',
        email: 'email@email.com',
      };
    }
  }

  return new DeleteUserByIdUseCaseMock();
};

describe('DeleteUserByIdController', () => {
  it('should call validation with correct values', async () => {
    const { sut, validationMock } = sutFactory();
    const validationSpy = jest.spyOn(validationMock, 'validate');
    await sut.handleRequest({ params: { id: '1000' } });
    expect(validationSpy).toBeCalledTimes(1);
    expect(validationSpy).toHaveBeenCalledWith({ params: { id: '1000' } });
  });

  it('should call DeleteUserByIdUseCase with correct values', async () => {
    const { sut, deleteUserByIdUseCaseMock } = sutFactory();
    const deleteUserByIdUseCaseSpy = jest.spyOn(
      deleteUserByIdUseCaseMock,
      'deleteById',
    );
    await sut.handleRequest({ params: { id: '21' } });
    expect(deleteUserByIdUseCaseSpy).toHaveBeenCalledTimes(1);
    expect(deleteUserByIdUseCaseSpy).toHaveBeenCalledWith('21');
  });

  it('should throw if validation throws', async () => {
    const { sut, validationMock } = sutFactory();
    jest
      .spyOn(validationMock, 'validate')
      .mockRejectedValue(new RequestValidationError('Error msg'));

    let error;

    try {
      await sut.handleRequest({ params: { id: '1000' } });
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
    expect(error.message).toBe('Error msg');
    expect(error.statusCode).toBe(400);
  });

  it('should throw if DeleteUserByIdUseCase throws', async () => {
    const { sut, deleteUserByIdUseCaseMock } = sutFactory();
    jest
      .spyOn(deleteUserByIdUseCaseMock, 'deleteById')
      .mockRejectedValue(new RequestValidationError('Error msg'));

    let error;

    try {
      await sut.handleRequest({ params: { id: '1000' } });
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
    expect(error.message).toBe('Error msg');
    expect(error.statusCode).toBe(400);
  });

  it('should delete from repository and return deleted user', async () => {
    const { sut, deleteUserByIdUseCaseMock } = sutFactory();
    jest.spyOn(deleteUserByIdUseCaseMock, 'deleteById').mockResolvedValue({
      id: '1000',
      first_name: 'first',
      last_name: 'last',
      email: 'email@email.com',
    });

    const response = await sut.handleRequest({ params: { id: '1000' } });
    expect(response.body.id).toBe('1000');
    expect(response.body.first_name).toBe('first');
    expect(response.body.last_name).toBe('last');
    expect(response.body.email).toBe('email@email.com');
    expect(response.statusCode).toBe(200);
  });
});

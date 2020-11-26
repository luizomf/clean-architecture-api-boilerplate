/* eslint-disable @typescript-eslint/no-explicit-any */
import { UpdatedUserPresenter } from '~/interface-adapters/presenters/responses/user/updated-user-presenter';
import { RequestBodyValidation } from '~/interface-adapters/validation/common/leaf/request-body-validation';
import { RequestParamsIdValidation } from '~/interface-adapters/validation/common/leaf/request-params-id-validation';
import { RequestParamsValidation } from '~/interface-adapters/validation/common/leaf/request-params-validation';
import { UserValidationComposite } from '~/interface-adapters/validation/user/composite/user-validation-composite';
import { UpdateUserRequestModelBody } from '~/domain/user/models/update-user-request-model';
import { UpdateUserUseCase } from '~/domain/user/use-cases/update-user-use-case';
import { User } from '~/domain/user/entities/user';
import { UpdateUserController } from './update-user-controller';

const sutFactory = () => {
  const updateUserRequestModelValidationMock = updateUserRequestModelValidationMockFactory();
  const updateUserUseCaseMock = updateUserUseCaseMockFactory();
  const presenter = new UpdatedUserPresenter();
  const sut = new UpdateUserController(
    updateUserRequestModelValidationMock,
    updateUserUseCaseMock,
    presenter,
  );

  return {
    sut,
    updateUserRequestModelValidationMock,
    updateUserUseCaseMock,
  };
};

const updateUserRequestModelValidationMockFactory = () => {
  class UpdateUserRequestModelValidationMock extends UserValidationComposite {
    constructor() {
      super();
      this.add(new RequestParamsValidation());
      this.add(new RequestBodyValidation());
      this.add(new RequestParamsIdValidation());
    }
  }
  return new UpdateUserRequestModelValidationMock();
};

const updateUserUseCaseMockFactory = () => {
  class UpdateUserUseCaseMock implements UpdateUserUseCase {
    async update(
      _id: string,
      _updateUserRequestModel: UpdateUserRequestModelBody,
    ): Promise<User | never> {
      return {
        id: '1',
        first_name: 'first',
        last_name: 'last',
        email: 'email@email.com',
        password_hash: 'any_hash',
      };
    }
  }
  return new UpdateUserUseCaseMock();
};

describe('UpdateUserController', () => {
  it('should call UpdateUserRequestModelValidation with request', async () => {
    const { sut, updateUserRequestModelValidationMock } = sutFactory();
    const updateUserRequestModelValidationSpy = jest.spyOn(
      updateUserRequestModelValidationMock,
      'validate',
    );
    await sut.handleRequest({ params: { id: '1' }, body: {} } as any);
    expect(updateUserRequestModelValidationSpy).toHaveBeenCalledTimes(1);
    expect(updateUserRequestModelValidationSpy).toHaveBeenCalledWith({
      params: { id: '1' },
      body: {},
    });
  });

  it('should throw if request is missing params, params.id or body', async () => {
    const { sut, updateUserRequestModelValidationMock } = sutFactory();
    jest.spyOn(updateUserRequestModelValidationMock, 'validate');

    let error;

    try {
      await sut.handleRequest({ params: {} } as any);
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
    expect(error.statusCode).toBe(400);

    error = undefined;
    try {
      await sut.handleRequest({ body: {} } as any);
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
    expect(error.statusCode).toBe(400);

    error = undefined;
    try {
      await sut.handleRequest({ params: { id: '1' } } as any);
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
    expect(error.statusCode).toBe(400);
  });

  it('should call UpdateUserUseCase with correct values', async () => {
    const { sut, updateUserUseCaseMock } = sutFactory();
    const updateUserUseCaseSpy = jest.spyOn(updateUserUseCaseMock, 'update');

    await sut.handleRequest({
      params: { id: '1' },
      body: { first_name: 'first' },
    });

    expect(updateUserUseCaseSpy).toHaveBeenCalledTimes(1);
    expect(updateUserUseCaseSpy).toHaveBeenLastCalledWith('1', {
      first_name: 'first',
    });
  });
});

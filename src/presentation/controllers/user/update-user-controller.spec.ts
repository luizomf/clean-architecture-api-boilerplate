/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseHandler } from '~/application/ports/responses/response-handler';
import { ResponseModel } from '~/application/ports/responses/response-model';
import { UpdateUserUseCase } from '~/domain/use-cases/user/update-user-use-case';
import { UserRequestWithPasswordString } from '~/domain/models/user/user-request-required-fields';
import { UpdateUserController } from './update-user-controller';

const sutFactory = () => {
  const useCaseMock = useCaseMockFactory();
  const presenterMock = presenterMockFactory();
  const sut = new UpdateUserController(useCaseMock, presenterMock);

  return {
    sut,
    useCaseMock,
    presenterMock,
  };
};

const useCaseMockFactory = () => {
  class UseCaseMock implements UpdateUserUseCase {
    async update(
      _id: string,
      _updateUserRequestModel: Partial<UserRequestWithPasswordString>,
    ): Promise<number> | never {
      return 1;
    }
  }

  return new UseCaseMock();
};

const presenterMockFactory = () => {
  class PresenterMock implements ResponseHandler<void> {
    async response(_body?: any): Promise<ResponseModel<void>> | never {
      return {
        statusCode: 204,
        body: undefined,
      };
    }
  }

  return new PresenterMock();
};

const responseDataMockFactory = () => {
  return {
    id: '1',
    first_name: 'first1',
    last_name: 'last1',
    email: 'email1@email.com',
    password_hash: 'hash1',
  };
};

const requestDataMockFactory = () => {
  const response = responseDataMockFactory();

  return {
    params: {
      id: '1',
    },
    body: {
      first_name: response.first_name,
      last_name: response.last_name,
      email: response.email,
      password: '123',
      confirmPassword: '123',
    },
  };
};

describe('UpdateUserController', () => {
  it('should throw if request.body or request.params.id does not exist', async () => {
    const { sut } = sutFactory();
    let error;
    try {
      await sut.handleRequest('' as any);
    } catch (requestError) {
      error = requestError;
    }
    expect(error.name).toBe('RequestValidationError');
    expect(error.message).toBe('Invalid request');
    expect(error.statusCode).toBe(400);
  });

  it('should call use case with correct values', async () => {
    const { sut, useCaseMock } = sutFactory();
    const useCaseSpy = jest.spyOn(useCaseMock, 'update');
    await sut.handleRequest(requestDataMockFactory());
    expect(useCaseSpy).toBeCalledTimes(1);
    expect(useCaseSpy).toBeCalledWith(
      requestDataMockFactory().params.id,
      requestDataMockFactory().body,
    );
  });

  it('should call presenter with no values', async () => {
    const { sut, presenterMock } = sutFactory();
    const presenterSpy = jest.spyOn(presenterMock, 'response');
    await sut.handleRequest(requestDataMockFactory());
    expect(presenterSpy).toBeCalledTimes(1);
    expect(presenterSpy).toBeCalledWith();
  });

  it('should return statusCode 204 and no body if everything is OK', async () => {
    const { sut } = sutFactory();
    const response = await sut.handleRequest(requestDataMockFactory());
    expect(response).toEqual({
      statusCode: 204,
    });
  });
});

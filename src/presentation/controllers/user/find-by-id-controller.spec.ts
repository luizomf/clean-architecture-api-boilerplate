/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseHandler } from '~/application/ports/responses/response-handler';
import { User } from '~/domain/models/user/user';
import { FindUserByIdUseCase } from '~/domain/use-cases/user/find-user-by-id-use-case';
import { FindUserByIdController } from './find-by-id-controller';

const sutFactory = () => {
  const useCaseMock = useCaseMockFactory();
  const presenterMock = presenterMockFactory();
  const sut = new FindUserByIdController(useCaseMock, presenterMock);

  return {
    sut,
    useCaseMock,
    presenterMock,
  };
};

const userDataMockFactory = () => {
  return {
    id: '1',
    first_name: 'first',
    last_name: 'last',
    email: 'email@email.com',
    password_hash: 'hash',
  };
};

const useCaseMockFactory = () => {
  class UseCaseMock implements FindUserByIdUseCase {
    async findById(_id: string): Promise<User> {
      return userDataMockFactory();
    }
  }

  return new UseCaseMock();
};

const presenterMockFactory = () => {
  class PresenterMock implements ResponseHandler<User> {
    async response(_body: any) {
      return {
        statusCode: 200,
        body: userDataMockFactory(),
      };
    }
  }

  return new PresenterMock();
};

describe('FindByIdController', () => {
  it('should throw if request.params or request.params.id is empty', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.handleRequest({});
    } catch (requestError) {
      error = requestError;
    }

    expect(error.name).toBe('RequestValidationError');
    expect(error.message).toBe('Missing params');
    expect(error.statusCode).toBe(400);

    error = undefined;
    try {
      await sut.handleRequest({ params: {} } as any);
    } catch (requestError) {
      error = requestError;
    }

    expect(error.name).toBe('RequestValidationError');
    expect(error.message).toBe('Missing params');
    expect(error.statusCode).toBe(400);
  });

  it('should call use case with correct values', async () => {
    const { sut, useCaseMock } = sutFactory();
    const useCaseSpy = jest.spyOn(useCaseMock, 'findById');
    await sut.handleRequest({ params: { id: '1' } });
    expect(useCaseSpy).toBeCalledTimes(1);
    expect(useCaseSpy).toBeCalledWith('1');
  });

  it('should call presenter with correct values', async () => {
    const { sut, presenterMock } = sutFactory();
    const presenterSpy = jest.spyOn(presenterMock, 'response');
    await sut.handleRequest({ params: { id: '1' } });
    expect(presenterSpy).toBeCalledTimes(1);
    expect(presenterSpy).toBeCalledWith(userDataMockFactory());
  });

  it('should return statusCode 200 and user if everything is OK', async () => {
    const { sut } = sutFactory();
    const response = await sut.handleRequest({ params: { id: '1' } });
    expect(response).toEqual({
      statusCode: 200,
      body: userDataMockFactory(),
    });
  });
});

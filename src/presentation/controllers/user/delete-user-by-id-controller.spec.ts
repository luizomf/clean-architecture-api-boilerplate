/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseHandler } from '~/application/ports/responses/response-handler';
import { ResponseModel } from '~/application/ports/responses/response-model';
import { DeleteUserByIdUseCase } from '~/domain/use-cases/user/delete-user-by-id-use-case';
import { DeleteUserByIdController } from './delete-user-by-id-controller';

const sutFactory = () => {
  const useCaseMock = useCaseMockFactory();
  const presenterMock = presenterMockFactory();
  const sut = new DeleteUserByIdController(useCaseMock, presenterMock);

  return {
    sut,
    useCaseMock,
    presenterMock,
  };
};

const useCaseMockFactory = () => {
  class UseCaseMock implements DeleteUserByIdUseCase {
    async deleteById(..._id: any): Promise<number> {
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

describe('DeleteUserByIdController', () => {
  it('should throw if request.params.id is set', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.handleRequest('' as any);
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
    const useCaseSpy = jest.spyOn(useCaseMock, 'deleteById');
    await sut.handleRequest({ params: { id: '1' } });
    expect(useCaseSpy).toBeCalledTimes(1);
    expect(useCaseSpy).toBeCalledWith('1');
  });

  it('should call presenter with empty body', async () => {
    const { sut, presenterMock } = sutFactory();
    const presenterSpy = jest.spyOn(presenterMock, 'response');
    await sut.handleRequest({ params: { id: '1' } });
    expect(presenterSpy).toBeCalledTimes(1);
    expect(presenterSpy).toBeCalledWith();
  });

  it('should return statusCode 204 and empty body if everything is OK', async () => {
    const { sut } = sutFactory();
    const response = await sut.handleRequest({ params: { id: '1' } });
    expect(response).toEqual({
      statusCode: 204,
    });
  });
});

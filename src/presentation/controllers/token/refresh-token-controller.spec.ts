/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseHandler } from '~/application/ports/responses/response-handler';
import { SignInResponseModel } from '~/domain/models/sign-in/sign-in-response-model';
import { RefreshTokenUseCase } from '~/domain/use-cases/token/refresh-token-use-case';
import { RefreshTokenController } from './refresh-token-controller';

const sutFactory = () => {
  const refreshTokenUseCaseMock = refreshTokenUseCaseMockFactory();
  const presenterMock = presenterMockFactory();
  const sut = new RefreshTokenController(
    refreshTokenUseCaseMock,
    presenterMock,
  );

  return {
    sut,
    refreshTokenUseCaseMock,
    presenterMock,
  };
};

const refreshTokenUseCaseMockFactory = () => {
  const refreshTokenUseCaseMock: jest.Mocked<RefreshTokenUseCase> = {
    refresh: jest.fn(),
  };

  refreshTokenUseCaseMock.refresh.mockResolvedValue({
    token: 'token',
    refreshToken: 'refreshToken',
  });

  return refreshTokenUseCaseMock;
};

const presenterMockFactory = () => {
  const presenterMock: jest.Mocked<ResponseHandler<SignInResponseModel>> = {
    response: jest.fn(),
  };

  return presenterMock;
};

describe('RefreshTokenController', () => {
  it('should throw if request is invalid', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.handleRequest({});
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
    expect(error.message).toBe('Invalid request');
  });

  it('should call use case with correct token', async () => {
    const { sut, refreshTokenUseCaseMock } = sutFactory();
    await sut.handleRequest({ body: { token: 'a_token' } });
    expect(refreshTokenUseCaseMock.refresh).toHaveBeenCalledTimes(1);
    expect(refreshTokenUseCaseMock.refresh).toHaveBeenCalledWith('a_token');
  });

  it('should throw if use case throws', async () => {
    const { sut, refreshTokenUseCaseMock } = sutFactory();
    refreshTokenUseCaseMock.refresh.mockRejectedValueOnce(new Error(''));
    let error;

    try {
      await sut.handleRequest({ body: { token: 'a_token' } });
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('Error');
  });

  it('should throw if token is not a string', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.handleRequest({ body: { token: 123 } } as any);
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
  });

  it('should call presenter with correct values', async () => {
    const { sut, presenterMock } = sutFactory();
    await sut.handleRequest({ body: { token: 'a_token' } });
    expect(presenterMock.response).toHaveBeenCalledTimes(1);
    expect(presenterMock.response).toHaveBeenCalledWith({
      token: 'token',
      refreshToken: 'refreshToken',
    });
  });
});

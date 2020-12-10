/* eslint-disable @typescript-eslint/no-explicit-any */
import { SignIn } from '~/application/use-cases/sign-in/sign-in';
import { SignInResponseModel } from '~/domain/models/sign-in/sign-in-response-model';
import { GenericSuccessResponse } from '~/presentation/responses/generic-success-response';
import { SignInController } from './sign-in-controller';

jest.mock('~/application/use-cases/sign-in/sign-in');
jest.mock('~/presentation/responses/generic-success-response');

const SignInMock = SignIn as jest.Mock<SignIn>;
const PresenterMock = GenericSuccessResponse as jest.Mock<
  GenericSuccessResponse<SignInResponseModel>
>;

const sutFactory = () => {
  const signInMock = new SignInMock() as jest.Mocked<SignIn>;
  const presenter = new PresenterMock() as jest.Mocked<
    GenericSuccessResponse<SignInResponseModel>
  >;
  const sut = new SignInController(signInMock, presenter);

  return {
    sut,
    signInMock,
    presenter,
  };
};

describe('SignInController', () => {
  it('should call use case with correct values', async () => {
    const { sut, signInMock } = sutFactory();
    await sut.handleRequest({
      body: { email: 'email@email.com', password: '123' },
    });
    expect(signInMock.verify).toHaveBeenCalledTimes(1);
    expect(signInMock.verify).toHaveBeenCalledWith({
      email: 'email@email.com',
      password: '123',
    });
  });

  it('should throw if request is invalid', async () => {
    const { sut } = sutFactory();

    let error = new Error('');
    try {
      await sut.handleRequest({} as any);
    } catch (e) {
      error = e;
    }
    expect(error.name).toBe('RequestValidationError');

    error = new Error('');
    try {
      await sut.handleRequest(undefined as any);
    } catch (e) {
      error = e;
    }
    expect(error.name).toBe('RequestValidationError');
  });

  it('should throw if e-mail of password is empty', async () => {
    const { sut } = sutFactory();

    let error = new Error('');
    try {
      await sut.handleRequest({ body: { email: '', password: '123' } });
    } catch (e) {
      error = e;
    }
    expect(error.name).toBe('UnauthorizedError');
    expect(error.message).toBe('Missing e-mail or password');

    error = new Error('');
    try {
      await sut.handleRequest({ body: { email: '123', password: '' } });
    } catch (e) {
      error = e;
    }
    expect(error.name).toBe('UnauthorizedError');
    expect(error.message).toBe('Missing e-mail or password');
  });

  it('should throw if use case throws', async () => {
    const { sut, signInMock } = sutFactory();
    signInMock.verify.mockRejectedValue(new Error('Expected Message'));

    let error = new Error('Unexpected Message');
    try {
      await sut.handleRequest({ body: { email: '123', password: '123' } });
    } catch (e) {
      error = e;
    }
    expect(error.name).toBe('Error');
    expect(error.message).toBe('Expected Message');
  });

  it('should call presenter once', async () => {
    const { sut, presenter, signInMock } = sutFactory();
    signInMock.verify.mockResolvedValueOnce({
      token: 'abc',
      refreshToken: 'bca',
    });
    await sut.handleRequest({ body: { email: '123', password: '123' } });
    expect(presenter.response).toHaveBeenCalledTimes(1);
    expect(presenter.response).toHaveBeenCalledWith({
      token: 'abc',
      refreshToken: 'bca',
    });
  });
});

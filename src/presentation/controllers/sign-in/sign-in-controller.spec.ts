/* eslint-disable @typescript-eslint/no-explicit-any */
import { SignIn } from '~/application/use-cases/sign-in/sign-in';
import { SignInController } from './sign-in-controller';

jest.mock('~/application/use-cases/sign-in/sign-in');
const SignInMock = SignIn as jest.Mock<SignIn>;

const sutFactory = () => {
  const signInMock = new SignInMock() as jest.Mocked<SignIn>;
  const sut = new SignInController(signInMock);

  return {
    sut,
    signInMock,
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
    expect(error.name).toBe('RequestValidationError');
    expect(error.message).toBe('Missing e-mail or password');

    error = new Error('');
    try {
      await sut.handleRequest({ body: { email: '123', password: '' } });
    } catch (e) {
      error = e;
    }
    expect(error.name).toBe('RequestValidationError');
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
});

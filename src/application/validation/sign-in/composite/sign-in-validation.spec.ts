/* eslint-disable @typescript-eslint/no-explicit-any */
import { SignInValidation } from './sign-in-validation';

const sutFactory = () => {
  const sut = new SignInValidation();

  return {
    sut,
  };
};

describe('SignInValidation', () => {
  it('should throw if email is empty', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.validate({ email: '', password: '123' } as any);
    } catch (e) {
      error = e;
    }

    expect(error.messages).toEqual(
      expect.arrayContaining(['Missing field email']),
    );
  });

  it('should throw if password is empty', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.validate({ email: 'email@email.com', password: '' } as any);
    } catch (e) {
      error = e;
    }

    expect(error.messages).toEqual(
      expect.arrayContaining(['Missing field password']),
    );
  });

  it('should throw if e-mail is invalid', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.validate({ email: 'emailEmailCom', password: '123' } as any);
    } catch (e) {
      error = e;
    }

    expect(error.messages).toEqual(expect.arrayContaining(['Invalid e-mail']));
  });
});

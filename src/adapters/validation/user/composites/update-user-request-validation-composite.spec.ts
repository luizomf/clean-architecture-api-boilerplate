import { EmailValidationError } from '~/application/errors/email-validation-error';
import { EmailValidator } from '~/application/ports/validators/email-validator';
import { UpdateUserRequestValidationComposite } from './update-user-request-validation-composite';

const sutFactory = () => {
  const emailValidatorMock = emailValidatorMockFactory();
  const sut = new UpdateUserRequestValidationComposite(emailValidatorMock);

  return {
    sut,
    emailValidatorMock,
  };
};

const emailValidatorMockFactory = () => {
  class EmailValidatorMock implements EmailValidator {
    async isValid(_email: string) {
      return true;
    }
  }

  return new EmailValidatorMock();
};

describe('UpdateUSerRequestValidationComposite', () => {
  it('should throw if body is missing', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.validate({});
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
  });

  it('should call emailValidator with correct values if email has a value', async () => {
    const { sut, emailValidatorMock } = sutFactory();
    const emailValidatorSpy = jest.spyOn(emailValidatorMock, 'isValid');
    await sut.validate({
      params: { id: '1' },
      body: { email: 'email@email.com' },
    });
    expect(emailValidatorSpy).toHaveBeenCalledTimes(1);
    expect(emailValidatorSpy).toHaveBeenCalledWith('email@email.com');
  });

  it('should throw if email has a value but the value is an invalid email', async () => {
    const { sut, emailValidatorMock } = sutFactory();
    jest
      .spyOn(emailValidatorMock, 'isValid')
      .mockRejectedValue(new EmailValidationError('Error'));
    let error;

    try {
      await sut.validate({ params: { id: '1' }, body: { email: 'email' } });
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('EmailValidationError');
    expect(error.message).toBe('Error');
  });

  it('should throw if password is sent without confirmPassword', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.validate({ params: { id: '1' }, body: { password: '123' } });
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
    expect(error.message).toBe('Password or confirmPassword is empty');
  });

  it('should throw if password and confirmPassword are different', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.validate({
        params: { id: '1' },
        body: { password: '123', confirmPassword: '321' },
      });
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
    expect(error.message).toBe('Password and confirmPassword must match');
  });

  it('should NOT throw if password and confirmPassword are equal', async () => {
    const { sut } = sutFactory();
    const noValue = await sut.validate({
      params: { id: '1' },
      body: { password: '123', confirmPassword: '123' },
    });
    expect(noValue).toBeUndefined();
  });
});

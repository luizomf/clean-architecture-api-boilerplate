/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestValidationError } from '~/application/errors/request-validation-error';
import { EmailValidator } from '~/domain/email/validation/email-validator';
import { UserValidationEmail } from './user-validation-email';

const sutFactory = () => {
  const emailValidatorMock = emailValidatorMockFactory();
  const sut = new UserValidationEmail(emailValidatorMock);

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

describe('UserValidationEmail', () => {
  it('should throw if request does not have a body', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.validate('' as any);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(new RequestValidationError('Missing body'));
  });

  it('should throw email is invalid', async () => {
    const { sut, emailValidatorMock } = sutFactory();
    jest.spyOn(emailValidatorMock, 'isValid').mockResolvedValueOnce(false);
    const request = { body: { email: 'invalid_email' } };
    let error;

    try {
      await sut.validate(request as any);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(new RequestValidationError('E-mail not valid'));
  });

  it('should return undefined if email pass validation', async () => {
    const { sut } = sutFactory();
    const request = { body: { email: 'invalid_email@email.com' } };
    let error;

    try {
      await sut.validate(request as any);
    } catch (e) {
      error = e;
    }

    expect(error).toBeUndefined();
  });
});

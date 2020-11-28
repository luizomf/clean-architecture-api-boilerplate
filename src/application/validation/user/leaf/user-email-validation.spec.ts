/* eslint-disable @typescript-eslint/no-explicit-any */

import { EmailValidatorAdapter } from '~/common/adapters/validators/email-validator-adapter';
import { UserEmailValidation } from './user-email-validation';

const sutFactory = () => {
  const sut = new UserEmailValidation(new EmailValidatorAdapter());

  return {
    sut,
  };
};

const userDataFactory = () => {
  return {
    first_name: 'first',
    last_name: 'last',
    email: 'email@email.com',
    password: '123',
    confirmPassword: '123',
  };
};

describe('UserEmailValidation', () => {
  it('should return void if email is valid', async () => {
    const { sut } = sutFactory();
    const noValue = await sut.validate(userDataFactory());
    expect(noValue).toBeUndefined();
  });

  it('should not validate if there is no request', async () => {
    const { sut } = sutFactory();
    const noValue = await sut.validate();
    expect(noValue).toBeUndefined();
  });

  it('should not validate if email is undefined', async () => {
    const { sut } = sutFactory();
    const data = userDataFactory();
    data.email = undefined as any;
    const noValue = await sut.validate(data);
    expect(noValue).toBeUndefined();
  });

  it('should throw if email is invalid', async () => {
    const { sut } = sutFactory();
    const data = userDataFactory();
    data.email = 'abc';
    let error;

    try {
      await sut.validate(data);
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('EmailValidationError');
  });
});

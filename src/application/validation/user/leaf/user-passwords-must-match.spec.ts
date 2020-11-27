/* eslint-disable @typescript-eslint/no-explicit-any */

import { UserPasswordsMustMatchValidation } from './user-passwords-must-match-validation';

const sutFactory = () => {
  const sut = new UserPasswordsMustMatchValidation();

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

describe('UserPasswordsMustMatchValidation', () => {
  it('should return void if passwords match', async () => {
    const { sut } = sutFactory();
    const noValue = await sut.validate(userDataFactory());
    expect(noValue).toBeUndefined();
  });

  it('should not validate if there is no request', async () => {
    const { sut } = sutFactory();
    const noValue = await sut.validate();
    expect(noValue).toBeUndefined();
  });

  it('should throw if passwords do not match', async () => {
    const { sut } = sutFactory();
    const data = userDataFactory();
    data.confirmPassword = '321';
    let error;

    try {
      await sut.validate(data);
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
  });

  it('should throw if password is sent without confirmPassword', async () => {
    const { sut } = sutFactory();
    const data = userDataFactory();
    data.confirmPassword = undefined as any;
    let error;

    try {
      await sut.validate(data);
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
    expect(error.message).toBe('Password and confirmPassword must match');
  });

  it('should throw if confirmPassword is sent without password', async () => {
    const { sut } = sutFactory();
    const data = userDataFactory();
    data.password = undefined as any;
    let error;

    try {
      await sut.validate(data);
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
    expect(error.message).toBe('Password and confirmPassword must match');
  });

  it('should not validate if password and confirmPassword is undefined', async () => {
    const { sut } = sutFactory();
    const data = userDataFactory();

    data.password = undefined as any;
    data.confirmPassword = undefined as any;

    const noValue = await sut.validate(data);
    expect(noValue).toBeUndefined();
  });
});

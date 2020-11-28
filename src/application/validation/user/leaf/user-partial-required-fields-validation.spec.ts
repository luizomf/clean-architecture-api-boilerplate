/* eslint-disable @typescript-eslint/no-explicit-any */

import { UserPartialRequiredFieldsValidation } from './user-partial-required-fields-validation';

const sutFactory = () => {
  const sut = new UserPartialRequiredFieldsValidation();

  return {
    sut,
  };
};

describe('UserPartialRequiredFieldsValidation', () => {
  it('should not throw if id is request is valid', async () => {
    const { sut } = sutFactory();
    const noValue = await sut.validate({
      first_name: 'first1',
      last_name: 'last1',
      email: 'email1@email.com',
      password: '123',
      confirmPassword: '123',
    });
    expect(noValue).toBeUndefined();
  });
  it('should not throw if a field is missing', async () => {
    const { sut } = sutFactory();
    const noValue = await sut.validate({
      first_name: 'first1',
      // last_name: 'last1',
      // email: 'email1@email.com',
      password: '123',
      confirmPassword: '123',
    });
    expect(noValue).toBeUndefined();
  });

  it('should throw if ANY field has no value', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.validate({
        first_name: '',
        last_name: 'last1',
        email: 'email1@email.com',
        password: '123',
        confirmPassword: '123',
      });
    } catch (e) {
      error = e;
    }

    expect(error.messages).toEqual(
      expect.arrayContaining(['Missing field first_name']),
    );

    error = undefined;
    try {
      await sut.validate({
        first_name: 'first1',
        last_name: '',
        email: 'email1@email.com',
        password: '123',
        confirmPassword: '123',
      });
    } catch (e) {
      error = e;
    }

    expect(error.messages).toEqual(
      expect.arrayContaining(['Missing field last_name']),
    );

    error = undefined;
    try {
      await sut.validate({
        first_name: 'first1',
        last_name: 'last1',
        email: '',
        password: '123',
        confirmPassword: '123',
      } as any);
    } catch (e) {
      error = e;
    }

    expect(error.messages).toEqual(
      expect.arrayContaining(['Missing field email']),
    );

    error = undefined;
    try {
      await sut.validate({
        first_name: 'first1',
        last_name: 'last1',
        email: 'email1@email.com',
        password: '',
        confirmPassword: '123',
      } as any);
    } catch (e) {
      error = e;
    }

    expect(error.messages).toEqual(
      expect.arrayContaining(['Missing field password']),
    );

    error = undefined;
    try {
      await sut.validate({
        first_name: 'first1',
        last_name: 'last1',
        email: 'email1@email.com',
        password: '123',
        confirmPassword: '',
      } as any);
    } catch (e) {
      error = e;
    }

    expect(error.messages).toEqual(
      expect.arrayContaining(['Missing field confirmPassword']),
    );

    error = undefined;
    try {
      await sut.validate({
        first_name: '',
        last_name: 'last1',
        email: 'email1@email.com',
        password: '',
        confirmPassword: '',
      } as any);
    } catch (e) {
      error = e;
    }

    expect(error.messages).toEqual(
      expect.arrayContaining([
        'Missing field confirmPassword',
        'Missing field password',
        'Missing field first_name',
      ]),
    );
  });

  it('should throw if field is not a string', async () => {
    const { sut } = sutFactory();

    let error;

    try {
      await sut.validate({
        first_name: 123,
        last_name: 'last1',
        email: 'email1@email.com',
        password: '123',
        confirmPassword: '123',
      } as any);
    } catch (e) {
      error = e;
    }

    expect(error.messages).toEqual(
      expect.arrayContaining(['Missing field first_name']),
    );
  });
});

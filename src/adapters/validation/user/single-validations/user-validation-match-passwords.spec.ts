/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestValidationError } from '~/application/errors/request-validation-error';
import { UserValidationMatchPasswords } from './user-validation-match-passwords';

describe('UserValidationMatchPasswords', () => {
  it('should throw if request does not have a body', async () => {
    const sut = new UserValidationMatchPasswords();
    let error;

    try {
      await sut.validate('' as any);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(new RequestValidationError('Missing body'));
  });

  it('should throw if missing password or confirmPassword', async () => {
    const sut = new UserValidationMatchPasswords();
    const request = { body: { password: '', confirmPassword: '' } } as any;
    let error;

    try {
      await sut.validate(request);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(
      new RequestValidationError('Password or confirmPassword is empty'),
    );
  });

  it('should throw if password and confirmPassword do not match', async () => {
    const sut = new UserValidationMatchPasswords();
    const request = { body: { password: 'any1', confirmPassword: 'any2' } };
    let error;

    try {
      await sut.validate(request as any);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(
      new RequestValidationError('Password and confirmPassword must match'),
    );
  });

  it('should return undefined if password and confirmPassword match', async () => {
    const sut = new UserValidationMatchPasswords();
    const request = { body: { password: 'any', confirmPassword: 'any' } };
    let error;

    try {
      await sut.validate(request as any);
    } catch (e) {
      error = e;
    }

    expect(error).toBeUndefined();
  });
});

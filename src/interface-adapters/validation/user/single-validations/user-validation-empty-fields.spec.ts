/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestValidationError } from '~/application/errors/request-validation-error';
import { UserValidationEmptyFields } from './user-validation-empty-fields';

const requestFactory = () => {
  return {
    body: {
      first_name: 'any',
      last_name: 'any',
      email: 'invalid_email',
      password: 'any',
      confirmPassword: 'any',
    },
  };
};

describe('UserValidationEmptyFields', () => {
  it('should throw if request does not have a body', async () => {
    const sut = new UserValidationEmptyFields();
    let error;

    try {
      await sut.validate('' as any);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(new RequestValidationError('Missing body'));
  });

  it('should throw first_name is missing', async () => {
    const sut = new UserValidationEmptyFields();
    const request = requestFactory() as any;
    delete request.body.first_name;
    let error;

    try {
      await sut.validate(request);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(new RequestValidationError('Missing first_name'));
  });

  it('should throw last_name is missing', async () => {
    const sut = new UserValidationEmptyFields();
    const request = requestFactory() as any;
    delete request.body.last_name;
    let error;

    try {
      await sut.validate(request);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(new RequestValidationError('Missing last_name'));
  });

  it('should throw email is missing', async () => {
    const sut = new UserValidationEmptyFields();
    const request = requestFactory() as any;
    delete request.body.email;
    let error;

    try {
      await sut.validate(request);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(new RequestValidationError('Missing email'));
  });

  it('should throw password is missing', async () => {
    const sut = new UserValidationEmptyFields();
    const request = requestFactory() as any;
    delete request.body.password;
    let error;

    try {
      await sut.validate(request);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(new RequestValidationError('Missing password'));
  });

  it('should throw confirmPassword is missing', async () => {
    const sut = new UserValidationEmptyFields();
    const request = requestFactory() as any;
    delete request.body.confirmPassword;
    let error;

    try {
      await sut.validate(request);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(
      new RequestValidationError('Missing confirmPassword'),
    );
  });

  it('should return undefined if validation pass', async () => {
    const sut = new UserValidationEmptyFields();
    const request = requestFactory();
    let error;

    try {
      await sut.validate(request as any);
    } catch (e) {
      error = e;
    }

    expect(error).toBeUndefined();
  });
});

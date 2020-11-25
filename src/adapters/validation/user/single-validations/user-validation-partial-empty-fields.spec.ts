import { UserValidationPartialEmptyFields } from './user-validation-partial-empty-fields';

const sutFactory = () => {
  const sut = new UserValidationPartialEmptyFields();

  return {
    sut,
  };
};

describe('UserValidationPartialEmptyFields', () => {
  it('should throw if body is missing', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.validate({});
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
    expect(error.statusCode).toBe(400);
  });

  it('should throw if first_name is set but has empty value', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.validate({ body: { first_name: '' } });
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
    expect(error.message).toBe('Missing first_name');
    expect(error.statusCode).toBe(400);
  });

  it('should NOT throw if first_name has a value', async () => {
    const { sut } = sutFactory();
    const noValue = await sut.validate({ body: { first_name: 'first_name' } });
    expect(noValue).toBeUndefined();
  });

  it('should throw if last_name is set but has empty value', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.validate({ body: { last_name: '' } });
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
    expect(error.message).toBe('Missing last_name');
    expect(error.statusCode).toBe(400);
  });

  it('should NOT throw if last_name has a value', async () => {
    const { sut } = sutFactory();
    const noValue = await sut.validate({ body: { last_name: 'last_name' } });
    expect(noValue).toBeUndefined();
  });

  it('should throw if password is set but has empty value', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.validate({ body: { password: '' } });
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
    expect(error.message).toBe('Missing password');
    expect(error.statusCode).toBe(400);
  });

  it('should NOT throw if password has a value', async () => {
    const { sut } = sutFactory();
    const noValue = await sut.validate({ body: { password: 'password' } });
    expect(noValue).toBeUndefined();
  });

  it('should throw if confirmPassword is set but has empty value', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.validate({ body: { confirmPassword: '' } });
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
    expect(error.message).toBe('Missing confirmPassword');
    expect(error.statusCode).toBe(400);
  });

  it('should NOT throw if confirmPassword has a value', async () => {
    const { sut } = sutFactory();
    const noValue = await sut.validate({
      body: { confirmPassword: 'confirmPassword' },
    });
    expect(noValue).toBeUndefined();
  });

  it('should throw if email is set but has empty value', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.validate({ body: { email: '' } });
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
    expect(error.message).toBe('Missing email');
    expect(error.statusCode).toBe(400);
  });

  it('should NOT throw if email has a value', async () => {
    const { sut } = sutFactory();
    const noValue = await sut.validate({
      body: { email: 'email' },
    });
    expect(noValue).toBeUndefined();
  });
});

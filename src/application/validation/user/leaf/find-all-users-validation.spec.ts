/* eslint-disable @typescript-eslint/no-explicit-any */
import { FindAllUsersValidation } from './find-all-users-validation';

const sutFactory = () => {
  const sut = new FindAllUsersValidation();

  return {
    sut,
  };
};

describe('FindAllUsersValidation', () => {
  it('should not throw if id is string and is not empty', async () => {
    const { sut } = sutFactory();
    const noValue = await sut.validate({
      order: 'desc',
      limit: 100,
      offset: 0,
    });
    expect(noValue).toBeUndefined();
  });

  it('should not throw if request is empty', async () => {
    const { sut } = sutFactory();
    const noValue = await sut.validate();
    expect(noValue).toBeUndefined();
  });

  it('should not throw if request is partial', async () => {
    const { sut } = sutFactory();
    const noValue = await sut.validate({
      order: 'desc',
    });
    expect(noValue).toBeUndefined();
  });

  it('should throw if order is not desc or asc', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.validate({
        order: 'abc' as any,
      });
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('Order must be desc or asc');
  });

  it('should throw if limit is not a number', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.validate({
        order: 'asc',
        limit: -5,
      } as any);
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('Expected a positive number');
  });

  it('should NOT throw if limit is a number', async () => {
    const { sut } = sutFactory();
    const noValue = await sut.validate({
      order: 'asc',
      limit: '5',
    } as any);
    expect(noValue).toBeUndefined();
  });

  it('should throw if offset is not a number', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.validate({
        order: 'asc',
        offset: 'abc',
      } as any);
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('Expected a positive number');
  });

  it('should NOT throw if offset is a number', async () => {
    const { sut } = sutFactory();
    const noValue = await sut.validate({
      order: 'asc',
      offset: '5',
    } as any);
    expect(noValue).toBeUndefined();
  });
});

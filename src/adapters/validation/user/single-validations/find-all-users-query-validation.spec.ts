/* eslint-disable @typescript-eslint/no-explicit-any */
import { FindAllUsersQueryValidation } from './find-all-users-query-validation';

const sutFactory = () => {
  const sut = new FindAllUsersQueryValidation();

  return {
    sut,
  };
};

describe('FindAllUsersQueryValidation', () => {
  it('should not validate if query has no values', async () => {
    const { sut } = sutFactory();
    await sut.validate({});
  });

  it('should not throw if all data is correct', async () => {
    const { sut } = sutFactory();
    await sut.validate({ query: { order: 'desc', limit: 100, offset: 1 } });
  });

  it('should accept any combination of order, limit and offset', async () => {
    const { sut } = sutFactory();
    await sut.validate({ query: { order: 'asc', offset: 1 } });
    await sut.validate({ query: { limit: 100, offset: 1 } });
    await sut.validate({ query: { offset: 1 } });
  });

  it('should throw if order has values other than "desc" or "asc"', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.validate({ query: { order: 'any' } } as any);
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
  });

  it('should throw if limit has any value other than a positive number', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.validate({ query: { order: 'asc', limit: -20 } } as any);
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
  });

  it('should throw if limit type is not a number', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.validate({ query: { order: 'asc', limit: '20' } } as any);
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
  });

  it('should throw if offset has any value other than a positive number', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.validate({
        query: { order: 'asc', limit: 20, offset: -20 },
      } as any);
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
  });
});

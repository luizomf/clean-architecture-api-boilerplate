import { GenericSanitizerAdapter } from './generic-sanitizer-adapter';

const sutFactory = () => {
  const sut = new GenericSanitizerAdapter();

  return {
    sut,
  };
};

describe('GenericSanitizerAdapter', () => {
  it('should remove unwanted tags', async () => {
    const { sut } = sutFactory();
    expect(sut.sanitize('<script></script>')).toBe('');
  });

  it('should return a string if value is undefined', async () => {
    const { sut } = sutFactory();
    expect(sut.sanitize(undefined)).toBe('');
  });

  it('should throw if value is not a string or undefined', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      sut.sanitize({});
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('SanitizerError');
  });
});

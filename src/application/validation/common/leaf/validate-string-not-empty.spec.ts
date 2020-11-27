import { ValidateStringNotEmpty } from './validate-string-not-empty';

const sutFactory = () => {
  const sut = new ValidateStringNotEmpty();

  return {
    sut,
  };
};

describe('ValidateStringNotEmpty', () => {
  it('should not throw if id is string and is not empty', async () => {
    const { sut } = sutFactory();
    const noValue = await sut.validate('1');
    expect(noValue).toBeUndefined();
  });

  it('should throw if id is empty', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.validate('');
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('Expected a string with a value');
  });
});

import { SanitizerError } from './sanitizer-error';

describe('SanitizerError', () => {
  it('should have properties statusCode and messages', () => {
    let error;

    const throwFn = () => {
      try {
        throw new SanitizerError('Some error message.');
      } catch (e) {
        error = e;
      }
    };

    throwFn();
    expect(error).toEqual(
      expect.objectContaining({
        name: 'SanitizerError',
        message: 'Some error message.',
        statusCode: 400,
        messages: expect.arrayContaining(['Some error message.']),
      }),
    );
  });
});

import { RequestValidationError } from './request-validation-error';

describe('RequestValidationError', () => {
  it('should have properties statusCode and messages', () => {
    let error;

    const throwFn = () => {
      try {
        throw new RequestValidationError('Some error message.');
      } catch (e) {
        error = e;
      }
    };

    throwFn();
    expect(error).toEqual(
      expect.objectContaining({
        name: 'RequestValidationError',
        message: 'Some error message.',
        statusCode: 400,
        messages: expect.arrayContaining(['Some error message.']),
      }),
    );
  });
});

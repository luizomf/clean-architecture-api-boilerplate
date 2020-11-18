import { EmailValidationError } from './email-validation-error';

describe('EmailValidationError', () => {
  it('should have properties statusCode and messages', () => {
    let error;

    const throwFn = () => {
      try {
        throw new EmailValidationError('Some error message.');
      } catch (e) {
        error = e;
      }
    };

    throwFn();
    expect(error).toEqual(
      expect.objectContaining({
        name: 'EmailValidationError',
        message: 'Some error message.',
        statusCode: 400,
        messages: expect.arrayContaining(['Some error message.']),
      }),
    );
  });
});

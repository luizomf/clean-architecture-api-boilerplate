import { DateTimeError } from './date-time-error';

describe('DateTimeError', () => {
  it('should have properties statusCode and messages', () => {
    let error;

    const throwFn = () => {
      try {
        throw new DateTimeError('Some error message.');
      } catch (e) {
        error = e;
      }
    };

    throwFn();

    expect(error).toEqual(
      expect.objectContaining({
        name: 'DateTimeError',
        message: 'Some error message.',
        statusCode: 500,
        messages: expect.arrayContaining(['Some error message.']),
      }),
    );
  });
});

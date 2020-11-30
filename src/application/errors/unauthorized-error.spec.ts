import { UnauthorizedError } from './unauthorized-error';

describe('UnauthorizedError', () => {
  it('should have properties statusCode and messages', () => {
    let error;

    const throwFn = () => {
      try {
        throw new UnauthorizedError('Some error message.');
      } catch (e) {
        error = e;
      }
    };

    throwFn();
    expect(error).toEqual(
      expect.objectContaining({
        name: 'UnauthorizedError',
        message: 'Some error message.',
        statusCode: 401,
        messages: expect.arrayContaining(['Some error message.']),
      }),
    );
  });
});

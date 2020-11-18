import { BadRequestError } from './bad-request-error';

describe('BadRequestError', () => {
  it('should have properties statusCode and messages', () => {
    let error;

    const throwFn = () => {
      try {
        throw new BadRequestError('Some error message.');
      } catch (e) {
        error = e;
      }
    };

    throwFn();
    expect(error).toEqual(
      expect.objectContaining({
        name: 'BadRequestError',
        message: 'Some error message.',
        statusCode: 400,
        messages: expect.arrayContaining(['Some error message.']),
      }),
    );
  });
});

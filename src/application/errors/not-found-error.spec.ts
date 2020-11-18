import { NotFoundError } from './not-found-error';

describe('NotFoundError', () => {
  it('should have properties statusCode and messages', () => {
    let error;

    const throwFn = () => {
      try {
        throw new NotFoundError('Some error message.');
      } catch (e) {
        error = e;
      }
    };

    throwFn();
    expect(error).toEqual(
      expect.objectContaining({
        name: 'NotFoundError',
        message: 'Some error message.',
        statusCode: 404,
        messages: expect.arrayContaining(['Some error message.']),
      }),
    );
  });
});

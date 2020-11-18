import { InternalServerError } from './internal-server-error';

describe('InternalServerError', () => {
  it('should have properties statusCode and messages', () => {
    let error;

    const throwFn = () => {
      try {
        throw new InternalServerError('Some error message.');
      } catch (e) {
        error = e;
      }
    };

    throwFn();
    expect(error).toEqual(
      expect.objectContaining({
        name: 'InternalServerError',
        message: 'Some error message.',
        statusCode: 500,
        messages: expect.arrayContaining(['Some error message.']),
      }),
    );
  });

  it('should have properties statusCode if nothing is sent', () => {
    let error;

    const throwFn = () => {
      try {
        throw new InternalServerError();
      } catch (e) {
        error = e;
      }
    };

    throwFn();
    expect(error).toEqual(
      expect.objectContaining({
        statusCode: 500,
      }),
    );
  });
});

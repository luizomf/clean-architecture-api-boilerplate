import { RepositoryError } from './repository-error';

describe('RepositoryError', () => {
  it('should have properties statusCode and messages', () => {
    let error;

    const throwFn = () => {
      try {
        throw new RepositoryError('Some error message.');
      } catch (e) {
        error = e;
      }
    };

    throwFn();
    expect(error).toEqual(
      expect.objectContaining({
        name: 'RepositoryError',
        message: 'Some error message.',
        statusCode: 500,
        messages: expect.arrayContaining(['Some error message.']),
      }),
    );
  });
});

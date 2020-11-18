import { UserExistsError } from './user-exists-error';

describe('UserExistsError', () => {
  it('should have properties statusCode and messages', () => {
    let error;

    const throwFn = () => {
      try {
        throw new UserExistsError('Some error message.');
      } catch (e) {
        error = e;
      }
    };

    throwFn();
    expect(error).toEqual(
      expect.objectContaining({
        name: 'UserExistsError',
        message: 'Some error message.',
        statusCode: 409,
        messages: expect.arrayContaining(['Some error message.']),
      }),
    );
  });
});

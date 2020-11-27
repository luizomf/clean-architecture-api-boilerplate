import { GenericDeletedPresenter } from './generic-deleted-presenter';

describe('GenericDeletedPresenter', () => {
  it('should have properties statusCode 204 and NO body', () => {
    const sut = new GenericDeletedPresenter();

    const expectedReturn = {
      statusCode: 204,
    };

    return sut
      .response()
      .then((response) => expect(response).toEqual(expectedReturn));
  });
});

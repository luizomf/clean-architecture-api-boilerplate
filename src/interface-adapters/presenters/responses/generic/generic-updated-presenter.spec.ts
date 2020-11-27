import { GenericUpdatedPresenter } from './generic-updated-presenter';

describe('GenericUpdatedPresenter', () => {
  it('should have properties statusCode 204 and NO body', () => {
    const sut = new GenericUpdatedPresenter();

    const expectedReturn = {
      statusCode: 204,
    };

    return sut
      .response()
      .then((response) => expect(response).toEqual(expectedReturn));
  });
});

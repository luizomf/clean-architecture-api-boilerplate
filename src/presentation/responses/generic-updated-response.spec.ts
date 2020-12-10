import { GenericUpdatedResponse } from './generic-updated-response';

describe('GenericUpdatedPresenter', () => {
  it('should have properties statusCode 204 and NO body', () => {
    const sut = new GenericUpdatedResponse();

    const expectedReturn = {
      statusCode: 204,
    };

    return sut
      .response()
      .then((response) => expect(response).toEqual(expectedReturn));
  });
});

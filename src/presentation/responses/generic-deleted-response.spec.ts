import { GenericDeletedResponse } from './generic-deleted-response';

describe('GenericDeletedPresenter', () => {
  it('should have properties statusCode 204 and NO body', () => {
    const sut = new GenericDeletedResponse();

    const expectedReturn = {
      statusCode: 204,
    };

    return sut
      .response()
      .then((response) => expect(response).toEqual(expectedReturn));
  });
});

import { GenericCreatedResponse } from './generic-created-response';

describe('Created Presenter', () => {
  it('should have properties statusCode 201 and body', () => {
    const sut = new GenericCreatedResponse();

    const bodyValue = { anyKey: 'anyValue' };
    const expectedReturn = {
      statusCode: 201,
      body: bodyValue,
    };

    return sut
      .response(bodyValue)
      .then((response) => expect(response).toEqual(expectedReturn));
  });
});

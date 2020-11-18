import { GenericCreatedPresenter } from './generic-created-presenter';

describe('Created Presenter', () => {
  it('should have properties statusCode 201 and body', () => {
    const sut = new GenericCreatedPresenter();

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

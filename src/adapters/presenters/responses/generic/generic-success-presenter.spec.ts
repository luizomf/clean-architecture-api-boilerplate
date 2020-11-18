import { GenericSuccessPresenter } from './generic-success-presenter';

describe('Success Presenter', () => {
  it('should have properties statusCode 200 and body', () => {
    const sut = new GenericSuccessPresenter();

    const bodyValue = { anyKey: 'anyValue' };
    const expectedReturn = {
      statusCode: 200,
      body: bodyValue,
    };

    return sut
      .response(bodyValue)
      .then((response) => expect(response).toEqual(expectedReturn));
  });
});

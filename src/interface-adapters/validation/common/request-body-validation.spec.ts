/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestValidationError } from '~/application/errors/request-validation-error';
import { RequestBodyValidation } from './request-body-validation';

describe('RequestBodyValidation', () => {
  it('should throw if request body is missing', async () => {
    const sut = new RequestBodyValidation();
    let error;

    try {
      await sut.validate('' as any);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(new RequestValidationError('Missing body'));
  });

  it('should return undefined if request body has a value', async () => {
    const sut = new RequestBodyValidation();
    let error;

    try {
      await sut.validate({ body: {} } as any);
    } catch (e) {
      error = e;
    }

    expect(error).toBeUndefined();
  });
});

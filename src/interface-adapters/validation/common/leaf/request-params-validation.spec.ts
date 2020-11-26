/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestValidationError } from '~/application/errors/request-validation-error';
import { RequestParamsValidation } from './request-params-validation';

describe('RequestIdValidation', () => {
  it('should throw if request.params is missing', async () => {
    const sut = new RequestParamsValidation();
    let error;

    try {
      await sut.validate({} as any);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(new RequestValidationError('Missing params'));
  });

  it('should return undefined if request.params has a value', async () => {
    const sut = new RequestParamsValidation();
    let error;

    try {
      await sut.validate({ params: {} } as any);
    } catch (e) {
      error = e;
    }

    expect(error).toBeUndefined();
  });
});

/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestValidationError } from '~/application/errors/request-validation-error';
import { RequestParamsIdValidation } from './request-params-id-validation';

describe('RequestIdValidation', () => {
  it('should throw if request.params.id is missing', async () => {
    const sut = new RequestParamsIdValidation();
    let error;

    try {
      await sut.validate({ params: {} } as any);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(new RequestValidationError('Missing id'));
  });

  it('should return undefined if request.params.id has a value', async () => {
    const sut = new RequestParamsIdValidation();
    let error;

    try {
      await sut.validate({ params: { id: '1' } } as any);
    } catch (e) {
      error = e;
    }

    expect(error).toBeUndefined();
  });
});

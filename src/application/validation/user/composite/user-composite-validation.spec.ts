/* eslint-disable @typescript-eslint/no-explicit-any */

import { ValidationComposite } from '~/application/ports/validation/validation-composite';
import { UserCompositeValidation } from './user-composite-validation';
const sutFactory = () => {
  const sut = new UserCompositeValidation();
  const validation1 = mockValidationFactory();
  const validation2 = mockValidationFactory();
  const validation3 = mockValidationFactory();

  return {
    sut,
    validation1,
    validation2,
    validation3,
  };
};

const mockValidationFactory = () => {
  class ValidationMock extends ValidationComposite {
    async validate(_any: any) {}
  }

  return new ValidationMock();
};

describe('UserCompositeValidation', () => {
  it('should throw if there are no validations', async () => {
    const { sut } = sutFactory();

    let error;

    try {
      await sut.validate({} as any);
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('InternalServerError');
  });

  it('should call all validations with correct values', async () => {
    const { sut, validation1, validation2, validation3 } = sutFactory();
    sut.add(validation1, validation2, validation3);

    const validation1Spy = jest.spyOn(validation1, 'validate');
    const validation2Spy = jest.spyOn(validation2, 'validate');
    const validation3Spy = jest.spyOn(validation3, 'validate');

    const mockCallData = {
      first_name: 'f',
      last_name: 'l',
      email: 'email',
      password: 'p',
      confirmPassword: 'c',
    };

    await sut.validate(mockCallData);

    expect(validation1Spy).toHaveBeenCalledTimes(1);
    expect(validation1Spy).toHaveBeenCalledWith(mockCallData);

    expect(validation2Spy).toHaveBeenCalledTimes(1);
    expect(validation2Spy).toHaveBeenCalledWith(mockCallData);

    expect(validation3Spy).toHaveBeenCalledTimes(1);
    expect(validation3Spy).toHaveBeenCalledWith(mockCallData);
  });
});

import { InternalServerError } from '~/application/errors/internal-server-error';
import { RequestValidationError } from '~/application/errors/request-validation-error';
import { RequestParamsIdValidation } from '../../common/request-params-id-validation';
import { RequestParamsValidation } from '../../common/request-params-validation';
import { UserValidationComposite } from './user-validation-composite';

const sutFactory = () => {
  const sut = new UserValidationComposite();
  sut.add(new RequestParamsValidation());
  sut.add(new RequestParamsIdValidation());
  return { sut };
};

describe('User Validation Composite', () => {
  it('should throw if dev do not add validations', async () => {
    const sut = new UserValidationComposite();
    return sut
      .validate({})
      .catch((e) =>
        expect(e).toEqual(
          new InternalServerError(
            'UserValidationComposite missing validations',
          ),
        ),
      );
  });

  it('should throw RequestValidationError if params are empty', async () => {
    const { sut } = sutFactory();
    return sut
      .validate({})
      .catch((e) =>
        expect(e).toEqual(new RequestValidationError('Missing params')),
      );
  });

  it('should throw RequestValidationError if user id is empty', async () => {
    const { sut } = sutFactory();
    return sut
      .validate({ params: {} })
      .catch((e) =>
        expect(e).toEqual(new RequestValidationError('Missing id')),
      );
  });

  it('should return nothing of user id is provided', async () => {
    const { sut } = sutFactory();
    return sut
      .validate({ params: { id: 1 } })
      .then((r) => expect(r).toBeUndefined());
  });
});

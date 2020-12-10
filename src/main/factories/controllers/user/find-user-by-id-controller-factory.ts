import { FindUserByIdController } from '~/presentation/controllers/user/find-by-id-controller';
import { FindUserById } from '~/application/use-cases/user/find-user-by-id';
import { findUserByIdRepository } from '~/infrastructure/repositories/user/user-default-repository';
import { GenericSuccessResponse } from '~/presentation/responses/generic-success-response';
import { User } from '~/domain/models/user/user';
import { ValidateStringNotEmpty } from '~/application/validation/common/leaf/validate-string-not-empty';

export const findUserByIdControllerFactory = () => {
  const successUserPresenter = new GenericSuccessResponse<User>();
  const findUserByIdValidation = new ValidateStringNotEmpty();
  const findUserById = new FindUserById(
    findUserByIdRepository,
    findUserByIdValidation,
  );
  const findUserByIdController = new FindUserByIdController(
    findUserById,
    successUserPresenter,
  );

  return {
    successUserPresenter,
    findUserById,
    findUserByIdController,
    findUserByIdValidation,
  };
};

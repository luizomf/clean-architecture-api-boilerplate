import { FindUserByIdController } from '~/presentation/controllers/user/find-by-id-controller';
import { FindUserById } from '~/application/use-cases/user/find-user-by-id';
import { findUserByIdRepository } from '~/infrastructure/repositories/user/user-default-repository';
import { GenericSuccessPresenter } from '~/presentation/presenters/responses/generic/generic-success-presenter';
import { User } from '~/domain/models/user/user';
import { ValidateStringNotEmpty } from '~/application/validation/common/leaf/validate-string-not-empty';

export const findUserByIdControllerFactory = () => {
  const successUserPresenter = new GenericSuccessPresenter<User>();
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

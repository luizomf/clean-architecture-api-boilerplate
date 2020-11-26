import { FindUserByIdController } from '~/interface-adapters/controllers/user/find-by-id-controller';
import { FindUserById } from '~/application/use-cases/user/find-user-by-id';
import { SuccessUserPresenter } from '~/interface-adapters/presenters/responses/user/success-user-presenter';
import { FindUserByIdValidationComposite } from '~/interface-adapters/validation/user/composite/find-user-by-id-validation-composite';
import { findUserByIdRepository } from '~/infrastructure/repositories/user/user-default-repository';

export const findUserByIdControllerFactory = () => {
  const findUserByIdValidationComposite = new FindUserByIdValidationComposite();
  const successUserPresenter = new SuccessUserPresenter();
  const findUserById = new FindUserById(findUserByIdRepository);
  const findUserByIdController = new FindUserByIdController(
    findUserById,
    findUserByIdValidationComposite,
    successUserPresenter,
  );

  return {
    findUserByIdValidationComposite,
    successUserPresenter,
    findUserById,
    findUserByIdController,
  };
};

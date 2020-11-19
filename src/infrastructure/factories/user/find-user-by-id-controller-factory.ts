import { FindUserByIdController } from '~/adapters/controllers/user/find-by-id-controller';
import { FindUserByIdUseCase } from '~/application/use-cases/user/find-user-by-id';
import { SuccessUserPresenter } from '~/adapters/presenters/responses/user/success-user-presenter';
import { FindUserByIdValidationComposite } from '~/adapters/validation/user/composites/find-user-by-id-validation-composite';
import { UserSqlRepository } from '~/infrastructure/repositories/user/sql/user-sql-repository';

export const findUserByIdControllerFactory = () => {
  const findUserByIdValidationComposite = new FindUserByIdValidationComposite();
  const successUserPresenter = new SuccessUserPresenter();
  const findUserByIdUseCase = new FindUserByIdUseCase(new UserSqlRepository());
  const findUserByIdController = new FindUserByIdController(
    findUserByIdUseCase,
    findUserByIdValidationComposite,
    successUserPresenter,
  );

  return {
    findUserByIdValidationComposite,
    successUserPresenter,
    findUserByIdUseCase,
    findUserByIdController,
  };
};

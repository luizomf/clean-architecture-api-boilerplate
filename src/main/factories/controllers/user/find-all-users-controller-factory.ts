import { FindAllUsers } from '~/application/use-cases/user/find-all-users';
import { FindAllUsersValidation } from '~/application/validation/user/leaf/find-all-users-validation';
import { User } from '~/domain/models/user/user';
import { findAllUsersRepository } from '~/infrastructure/repositories/user/user-default-repository';
import { FindAllUsersController } from '~/presentation/controllers/user/find-all-users-controller';
import { GenericSuccessResponse } from '~/presentation/responses/generic-success-response';

export const findAllUsersControllerFactory = () => {
  const findAllUsersValidation = new FindAllUsersValidation();
  const findAllUsersUseCase = new FindAllUsers(
    findAllUsersRepository,
    findAllUsersValidation,
  );
  const genericSuccessPresenter = new GenericSuccessResponse<User[]>();
  const findAllUsersController = new FindAllUsersController(
    findAllUsersUseCase,
    genericSuccessPresenter,
  );

  return {
    findAllUsersController,
    findAllUsersUseCase,
    genericSuccessPresenter,
  };
};

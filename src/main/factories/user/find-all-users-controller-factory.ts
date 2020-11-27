import { FindAllUsers } from '~/application/use-cases/user/find-all-users';
import { User } from '~/domain/user/entities/user';
import { findAllUsersRepository } from '~/infrastructure/repositories/user/user-default-repository';
import { FindAllUsersController } from '~/interface-adapters/controllers/user/find-all-users-controller';
import { GenericSuccessPresenter } from '~/interface-adapters/presenters/responses/generic/generic-success-presenter';

export const findAllUsersControllerFactory = () => {
  const findAllUsersUseCase = new FindAllUsers(findAllUsersRepository);
  const genericSuccessPresenter = new GenericSuccessPresenter<User[]>();
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

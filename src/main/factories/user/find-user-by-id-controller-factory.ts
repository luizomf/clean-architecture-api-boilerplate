import { FindUserByIdController } from '~/interface-adapters/controllers/user/find-by-id-controller';
import { FindUserById } from '~/application/use-cases/user/find-user-by-id';
import { findUserByIdRepository } from '~/infrastructure/repositories/user/user-default-repository';
import { GenericSuccessPresenter } from '~/interface-adapters/presenters/responses/generic/generic-success-presenter';
import { User } from '~/domain/user/entities/user';

export const findUserByIdControllerFactory = () => {
  const successUserPresenter = new GenericSuccessPresenter<User>();
  const findUserById = new FindUserById(findUserByIdRepository);
  const findUserByIdController = new FindUserByIdController(
    findUserById,
    successUserPresenter,
  );

  return {
    successUserPresenter,
    findUserById,
    findUserByIdController,
  };
};

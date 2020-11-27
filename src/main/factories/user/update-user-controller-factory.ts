import { UpdateUserController } from '~/interface-adapters/controllers/user/update-user-controller';
import { UpdateUser } from '~/application/use-cases/user/update-user';
import {
  findUserByEmailRepository,
  findUserByIdRepository,
  updateUserRepository,
} from '~/infrastructure/repositories/user/user-default-repository';
import { GenericUpdatedPresenter } from '~/interface-adapters/presenters/responses/generic/generic-updated-presenter';
import { BCryptAdapter } from '~/common/adapters/security/bcrypt-adapter';

export const updateUserControllerFactory = () => {
  const passwordHashing = new BCryptAdapter();
  const updateUserPresenter = new GenericUpdatedPresenter();
  const updateUserUseCase = new UpdateUser(
    updateUserRepository,
    findUserByIdRepository,
    findUserByEmailRepository,
    passwordHashing,
  );
  const updateUserController = new UpdateUserController(
    updateUserUseCase,
    updateUserPresenter,
  );

  return {
    updateUserController,
    passwordHashing,
    updateUserPresenter,
    updateUserUseCase,
  };
};

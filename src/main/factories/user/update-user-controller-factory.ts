import { UpdateUserController } from '~/presentation/controllers/user/update-user-controller';
import { UpdateUser } from '~/application/use-cases/user/update-user';
import {
  findUserByEmailRepository,
  findUserByIdRepository,
  updateUserRepository,
} from '~/infrastructure/repositories/user/user-default-repository';
import { GenericUpdatedPresenter } from '~/presentation/presenters/responses/generic/generic-updated-presenter';
import { BCryptAdapter } from '~/common/adapters/security/bcrypt-adapter';
import { UpdateUserValidation } from '~/application/validation/user/composite/update-user-validation';

export const updateUserControllerFactory = () => {
  const passwordHashing = new BCryptAdapter();
  const updateUserPresenter = new GenericUpdatedPresenter();
  const updateUserValidation = new UpdateUserValidation();
  const updateUserUseCase = new UpdateUser(
    updateUserRepository,
    findUserByIdRepository,
    findUserByEmailRepository,
    passwordHashing,
    updateUserValidation,
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
    updateUserValidation,
  };
};

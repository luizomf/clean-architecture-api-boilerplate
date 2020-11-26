import { UpdateUserController } from '~/interface-adapters/controllers/user/update-user-controller';
import { UpdatedUserPresenter } from '~/interface-adapters/presenters/responses/user/updated-user-presenter';
import { UpdateUserRequestValidationComposite } from '~/interface-adapters/validation/user/composite/update-user-request-validation-composite';
import { UpdateUser } from '~/application/use-cases/user/update-user';
import { BCryptAdapter } from '~/common/adapters/validators/bcrypt-adapter';
import { EmailValidatorAdapter } from '~/common/adapters/validators/email-validator-adapter';
import {
  findUserByEmailRepository,
  findUserByIdRepository,
  updateUserRepository,
} from '~/infrastructure/repositories/user/user-default-repository';

export const updateUserControllerFactory = () => {
  const emailValidator = new EmailValidatorAdapter();
  const updateUserRequestValidationComposite = new UpdateUserRequestValidationComposite(
    emailValidator,
  );
  const passwordHashing = new BCryptAdapter();
  const updateUserPresenter = new UpdatedUserPresenter();
  const updateUserUseCase = new UpdateUser(
    updateUserRepository,
    findUserByIdRepository,
    findUserByEmailRepository,
    passwordHashing,
  );
  const updateUserController = new UpdateUserController(
    updateUserRequestValidationComposite,
    updateUserUseCase,
    updateUserPresenter,
  );

  return {
    updateUserController,
    emailValidator,
    updateUserRequestValidationComposite,
    passwordHashing,
    updateUserPresenter,
    updateUserUseCase,
  };
};

import { CreateUserController } from '~/interface-adapters/controllers/user/create-user-controller';
import { CreatedUserPresenter } from '~/interface-adapters/presenters/responses/user/created-user-presenter';
import { CreateUserRequestValidationComposite } from '~/interface-adapters/validation/user/composite/create-user-request-validation-composite';
import { CreateUser } from '~/application/use-cases/user/create-user';
import { BCryptAdapter } from '~/common/adapters/validators/bcrypt-adapter';
import { EmailValidatorAdapter } from '~/common/adapters/validators/email-validator-adapter';
import {
  createUserRepository,
  findUserByEmailRepository,
} from '~/infrastructure/repositories/user/user-default-repository';

export const createUserControllerFactory = () => {
  const bcryptAdapter = new BCryptAdapter();
  const createUserUseCase = new CreateUser(
    createUserRepository,
    findUserByEmailRepository,
    bcryptAdapter,
  );
  const emailValidatorAdapter = new EmailValidatorAdapter();
  const createUserRequestValidationAdapter = new CreateUserRequestValidationComposite(
    emailValidatorAdapter,
  );
  const createdUserPresenter = new CreatedUserPresenter();
  const createUserController = new CreateUserController(
    createUserUseCase,
    createUserRequestValidationAdapter,
    createdUserPresenter,
  );

  return {
    createUserRepository,
    bcryptAdapter,
    createUserUseCase,
    emailValidatorAdapter,
    createUserRequestValidationAdapter,
    createdUserPresenter,
    createUserController,
  };
};

import { CreateUserController } from '~/adapters/controllers/user/create-user-controller';
import { CreatedUserPresenter } from '~/adapters/presenters/responses/user/created-user-presenter';
import { CreateUserRequestValidationComposite } from '~/adapters/validation/user/composites/create-user-request-validation-composite';
import { CreateUser } from '~/application/use-cases/user/create-user';
import { BCryptAdapter } from '~/common/validators/bcrypt-adapter';
import { EmailValidatorAdapter } from '~/common/validators/email-validator-adapter';
import { inMemoryUserRepositoryFactory } from '~/infrastructure/repositories/user/testing-repository/in-memory-user-repository-factory';

export const createUserControllerFactory = () => {
  const createUserRepository = inMemoryUserRepositoryFactory();
  const bcryptAdapter = new BCryptAdapter();
  const createUserUseCase = new CreateUser(
    createUserRepository,
    createUserRepository,
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

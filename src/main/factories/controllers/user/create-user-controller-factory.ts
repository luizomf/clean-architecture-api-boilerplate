import { CreateUserController } from '~/presentation/controllers/user/create-user-controller';
import { CreateUser } from '~/application/use-cases/user/create-user';
import {
  createUserRepository,
  findUserByEmailRepository,
} from '~/infrastructure/repositories/user/user-default-repository';
import { GenericCreatedResponse } from '~/presentation/responses/generic-created-response';
import { User } from '~/domain/models/user/user';
import { BCryptAdapter } from '~/common/adapters/security/bcrypt-adapter';
import { CreateUserValidation } from '~/application/validation/user/composite/create-user-validation';

export const createUserControllerFactory = () => {
  const bcryptAdapter = new BCryptAdapter();
  const createUserValidation = new CreateUserValidation();
  const createUserUseCase = new CreateUser(
    createUserRepository,
    findUserByEmailRepository,
    bcryptAdapter,
    createUserValidation,
  );
  const createdUserPresenter = new GenericCreatedResponse<User>();
  const createUserController = new CreateUserController(
    createUserUseCase,
    createdUserPresenter,
  );

  return {
    createUserRepository,
    bcryptAdapter,
    createUserUseCase,
    createdUserPresenter,
    createUserController,
    createUserValidation,
  };
};

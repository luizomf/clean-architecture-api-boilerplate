import { SignIn } from '~/application/use-cases/sign-in/sign-in';
import { SignInValidation } from '~/application/validation/sign-in/composite/sign-in-validation';
import { BCryptAdapter } from '~/common/adapters/security/bcrypt-adapter';
import { jwtTokenAdapterSingleton } from '~/common/adapters/security/jwt-token-adapter';
import { SignInResponseModel } from '~/domain/models/sign-in/sign-in-response-model';
import { createTokenRepository } from '~/infrastructure/repositories/token/token-default-repository';
import { findUserByEmailRepository } from '~/infrastructure/repositories/user/user-default-repository';
import { SignInController } from '~/presentation/controllers/sign-in/sign-in-controller';
import { GenericSuccessPresenter } from '~/presentation/presenters/responses/generic/generic-success-presenter';

export const signInControllerFactory = () => {
  const jwtToken = jwtTokenAdapterSingleton;
  const passwordHashing = new BCryptAdapter();
  const signInValidation = new SignInValidation();
  const createTokenRepositorySingleton = createTokenRepository;

  const signInUseCase = new SignIn(
    findUserByEmailRepository,
    passwordHashing,
    jwtToken,
    createTokenRepositorySingleton,
    signInValidation,
  );

  const presenter = new GenericSuccessPresenter<SignInResponseModel>();
  const signInController = new SignInController(signInUseCase, presenter);

  return {
    signInController,
    signInUseCase,
    jwtToken,
    passwordHashing,
    signInValidation,
    createTokenRepositorySingleton,
    presenter,
  };
};

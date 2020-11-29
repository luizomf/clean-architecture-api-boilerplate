import { SignIn } from '~/application/use-cases/sign-in/sign-in';
import { SignInValidation } from '~/application/validation/sign-in/composite/sign-in-validation';
import { BCryptAdapter } from '~/common/adapters/security/bcrypt-adapter';
import { JwtTokenAdapter } from '~/common/adapters/security/jwt-token-adapter';
import { findUserByEmailRepository } from '~/infrastructure/repositories/user/user-default-repository';
import { SignInController } from '~/presentation/controllers/sign-in/sign-in-controller';

const secret = process.env.JWT_SECRET as string;

export const signInControllerFactory = () => {
  const jwtToken = new JwtTokenAdapter(secret);
  const passwordHashing = new BCryptAdapter();
  const signInValidation = new SignInValidation();
  const signInUseCase = new SignIn(
    findUserByEmailRepository,
    passwordHashing,
    jwtToken,
    signInValidation,
  );
  const signInController = new SignInController(signInUseCase);

  return {
    signInController,
    signInUseCase,
    jwtToken,
    passwordHashing,
    signInValidation,
  };
};

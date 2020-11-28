import { InternalServerError } from '~/application/errors/internal-server-error';
import { NotFoundError } from '~/application/errors/not-found-error';
import { RequestValidationError } from '~/application/errors/request-validation-error';
import { FindUserByEmailRepository } from '~/application/ports/repositories/user/find-user-by-email-repository';
import { JwtToken } from '~/application/ports/security/jwt-token';
import { PasswordHashing } from '~/application/ports/security/password-hashing';
import { SignInUseCase } from '~/application/ports/use-cases/sign-in/sign-in-use-case';
import { ValidationComposite } from '~/application/ports/validation/validation-composite';
import { SignInModel } from '~/domain/sign-in/models/sign-in-model';

export class SignIn implements SignInUseCase {
  constructor(
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    private readonly passwordHashing: PasswordHashing,
    private readonly jwtToken: JwtToken,
    private readonly validation?: ValidationComposite<SignInModel>,
  ) {}

  async verify(signInModel: SignInModel): Promise<string | never> {
    if (this.validation) {
      await this.validation.validate(signInModel);
    }

    const user = await this.findUserByEmailRepository.findByEmail(
      signInModel.email,
    );

    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!user.password_hash) {
      throw new InternalServerError('User has no password');
    }

    const isPasswordCorrect = await this.passwordHashing.compare(
      signInModel.password,
      user.password_hash,
    );

    if (!isPasswordCorrect) {
      throw new RequestValidationError('Invalid credentials');
    }

    return this.jwtToken.sign(user.id);
  }
}

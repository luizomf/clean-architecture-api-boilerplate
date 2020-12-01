import { InternalServerError } from '~/application/errors/internal-server-error';
import { NotFoundError } from '~/application/errors/not-found-error';
import { UnauthorizedError } from '~/application/errors/unauthorized-error';
import { FindUserByEmailRepository } from '~/application/ports/repositories/user/find-user-by-email-repository';
import { JwtToken } from '~/application/ports/security/jwt-token';
import { PasswordHashing } from '~/application/ports/security/password-hashing';
import { SignInUseCase } from '~/application/ports/use-cases/sign-in/sign-in-use-case';
import { ValidationComposite } from '~/application/ports/validation/validation-composite';
import { SignInRequestModel } from '~/domain/sign-in/models/sign-in-request-model';
import { SignInResponseModel } from '~/domain/sign-in/models/sign-in-response-model';
import { User } from '~/domain/user/entities/user';

export class SignIn implements SignInUseCase {
  constructor(
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    private readonly passwordHashing: PasswordHashing,
    private readonly jwtToken: JwtToken,
    private readonly validation?: ValidationComposite<SignInRequestModel>,
  ) {}

  async verify(
    signInModel: SignInRequestModel,
  ): Promise<SignInResponseModel> | never {
    await this.runValidation(signInModel);
    const user = await this.findUserByEmail(signInModel);
    await this.checkPassword(user, signInModel);
    return {
      token: this.jwtToken.sign(user.id),
    };
  }

  private async runValidation(signInModel: SignInRequestModel) {
    if (this.validation) {
      await this.validation.validate(signInModel);
    }
  }

  private async findUserByEmail(
    signInModel: SignInRequestModel,
  ): Promise<User | never> {
    const user = await this.findUserByEmailRepository.findByEmail(
      signInModel.email,
    );

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  private async checkPassword(
    user: User,
    signInModel: SignInRequestModel,
  ): Promise<void | never> {
    if (!user.password_hash) {
      throw new InternalServerError('User has no password');
    }

    const isPasswordCorrect = await this.passwordHashing.compare(
      signInModel.password,
      user.password_hash,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedError('Invalid credentials');
    }
  }
}

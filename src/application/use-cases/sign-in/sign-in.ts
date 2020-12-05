import { InternalServerError } from '~/application/errors/internal-server-error';
import { NotFoundError } from '~/application/errors/not-found-error';
import { UnauthorizedError } from '~/application/errors/unauthorized-error';
import { FindUserByEmailRepository } from '~/application/ports/repositories/user/find-user-by-email-repository';
import { JwtToken } from '~/application/ports/security/jwt-token';
import { PasswordHashing } from '~/application/ports/security/password-hashing';
import { SignInUseCase } from '~/domain/use-cases/sign-in/sign-in-use-case';
import { ValidationComposite } from '~/application/ports/validation/validation-composite';
import { SignInRequestModel } from '~/domain/models/sign-in/sign-in-request-model';
import { SignInResponseModel } from '~/domain/models/sign-in/sign-in-response-model';
import { User } from '~/domain/models/user/user';
import { CreateTokenRepository } from '~/application/ports/repositories/token/create-token-repository';
import { formatDateTime } from '~/common/helpers/date/format-date-time';
import { SignedToken } from '~/domain/models/token/signed-token';

type SaveFreshTokenParams = {
  refreshTokenData: SignedToken;
  user: User;
};

export class SignIn implements SignInUseCase {
  constructor(
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    private readonly passwordHashing: PasswordHashing,
    private readonly jwtToken: JwtToken,
    private readonly createTokenRepository: CreateTokenRepository,
    private readonly validation?: ValidationComposite<SignInRequestModel>,
  ) {}

  async verify(
    signInModel: SignInRequestModel,
  ): Promise<SignInResponseModel> | never {
    await this.runValidation(signInModel);
    const user = await this.findUserByEmail(signInModel);
    await this.checkPassword(user, signInModel);

    const accessTokenData = this.jwtToken.signAccessToken(user.id);
    const refreshTokenData = this.jwtToken.signRefreshToken(user.id);

    await this.saveRefreshToken({ refreshTokenData, user });

    return {
      token: accessTokenData.token,
      refreshToken: refreshTokenData.token,
    };
  }

  private async saveRefreshToken({
    refreshTokenData,
    user,
  }: SaveFreshTokenParams) {
    await this.createTokenRepository.create({
      token: refreshTokenData.token,
      user_id: user.id,
      expires_in: formatDateTime(refreshTokenData.expirationDate),
    });
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

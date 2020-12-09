import { RequestValidationError } from '~/application/errors/request-validation-error';
import { UnauthorizedError } from '~/application/errors/unauthorized-error';
import { CreateTokenRepository } from '~/application/ports/repositories/token/create-token-repository';
import { FindTokenByTokenRepository } from '~/application/ports/repositories/token/find-token-by-token-repository';
import { JwtToken } from '~/application/ports/security/jwt-token';
import { formatDateTime } from '~/common/helpers/date/format-date-time';
import { SignInResponseModel } from '~/domain/models/sign-in/sign-in-response-model';
import { RefreshTokenUseCase } from '~/domain/use-cases/token/refresh-token-use-case';

export class RefreshToken implements RefreshTokenUseCase {
  constructor(
    private readonly createTokenRepository: CreateTokenRepository,
    private readonly findByTokenRepository: FindTokenByTokenRepository,
    private readonly jwtAdapter: JwtToken,
  ) {}

  async refresh(refreshToken: string): Promise<SignInResponseModel> | never {
    if (!refreshToken) {
      throw new RequestValidationError('Empty refreshToken');
    }

    try {
      const userId = this.jwtAdapter.verify(refreshToken, false);
      const foundToken = await this.findByTokenRepository.findByToken(
        refreshToken,
      );

      if (!foundToken) {
        throw new UnauthorizedError();
      }

      const accessTokenData = this.jwtAdapter.signAccessToken(userId);
      const refreshTokenData = this.jwtAdapter.signRefreshToken(userId);

      await this.createTokenRepository.create({
        token: refreshTokenData.token,
        user_id: userId,
        expires_in: formatDateTime(refreshTokenData.expirationDate),
      });

      return {
        token: accessTokenData.token,
        refreshToken: refreshTokenData.token,
      };
    } catch (tokenError) {
      const error = new UnauthorizedError('Invalid refresh token');
      error.stack = tokenError.stack;
      throw error;
    }
  }
}

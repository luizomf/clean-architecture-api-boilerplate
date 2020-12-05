import jwt from 'jsonwebtoken';
import { JwtToken } from '~/application/ports/security/jwt-token';
import { createFutureDate } from '~/common/helpers/date/create-future-date';

export class JwtTokenAdapter implements JwtToken {
  private accessTokenExpirationInSeconds = 3600; // one hour
  private refreshTokenExpirationInSeconds = 3600; // 8 days

  constructor(
    private readonly secret: string,
    private readonly refreshSecret: string,
  ) {}

  signAccessToken(userId: string) {
    const expirationDate = createFutureDate(
      new Date(),
      this.accessTokenExpirationInSeconds,
    );

    const token = jwt.sign({ id: userId }, this.secret, {
      expiresIn: Math.ceil(expirationDate.getTime() / 1000),
    });

    return { token, expirationDate };
  }

  signRefreshToken(userId: string) {
    const expirationDate = createFutureDate(
      new Date(),
      this.refreshTokenExpirationInSeconds,
    );

    const token = jwt.sign({ id: userId }, this.refreshSecret, {
      expiresIn: Math.ceil(expirationDate.getTime() / 1000),
    });

    return { token, expirationDate };
  }

  verify(token: string, isAccessToken = true) {
    const secret = isAccessToken ? this.secret : this.refreshSecret;
    const userData = jwt.verify(token, secret) as { id: string };
    return userData.id;
  }
}

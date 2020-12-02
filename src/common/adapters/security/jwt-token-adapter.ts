import jwt from 'jsonwebtoken';
import { JwtToken } from '~/application/ports/security/jwt-token';

export class JwtTokenAdapter implements JwtToken {
  constructor(
    private readonly secret: string,
    private readonly refreshSecret: string,
  ) {}

  signAccessToken(userId: string) {
    const token = jwt.sign({ id: userId }, this.secret, {
      expiresIn: '8h',
    });

    return token;
  }

  signRefreshToken(userId: string) {
    const token = jwt.sign({ id: userId }, this.refreshSecret, {
      expiresIn: '8d',
    });

    return token;
  }

  verify(token: string, isAccessToken = true) {
    const secret = isAccessToken ? this.secret : this.refreshSecret;
    const userData = jwt.verify(token, secret) as { id: string };
    return userData.id;
  }
}

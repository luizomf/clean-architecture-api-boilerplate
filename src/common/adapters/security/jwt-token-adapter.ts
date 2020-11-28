import jwt from 'jsonwebtoken';
import { JwtToken } from '~/application/ports/security/jwt-token';

export class JwtTokenAdapter implements JwtToken {
  private readonly secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  sign(userId: string) {
    const token = jwt.sign({ id: userId }, this.secret, {
      expiresIn: '8h',
    });

    return token;
  }

  verify(token: string) {
    const userData = jwt.verify(token, this.secret) as { id: string };
    return userData.id;
  }
}

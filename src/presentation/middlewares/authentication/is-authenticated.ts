import { UnauthorizedError } from '~/application/errors/unauthorized-error';
import { Middleware } from '~/application/ports/middlewares/middleware';
import { MiddlewareRequestModel } from '~/application/ports/requests/middleware-request-model';
import { JwtTokenAdapter } from '~/common/adapters/security/jwt-token-adapter';

export class IsAuthenticatedMiddleware implements Middleware {
  constructor(private readonly jwtTokenAdapter: JwtTokenAdapter) {}

  async execute(request: MiddlewareRequestModel): Promise<void> | never {
    if (!request || !request.headers || !request.headers.authorization) {
      throw new UnauthorizedError('Invalid request');
    }

    const { authorization } = request.headers;
    const [, token] = authorization.split(/\s+/);

    try {
      const userId = this.jwtTokenAdapter.verify(token);
      request.headers.userId = userId;
    } catch (error) {
      const unauthorizedError = new UnauthorizedError(error.message);
      unauthorizedError.stack = error.stack;
      throw unauthorizedError;
    }
  }
}

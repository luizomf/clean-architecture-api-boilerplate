import { UnauthorizedError } from '~/application/errors/unauthorized-error';
import { Middleware } from '~/application/ports/middlewares/middleware';
import { MiddlewareRequestModel } from '~/application/ports/requests/middleware-request-model';
import { genericStringSanitizerSingleton } from '~/common/adapters/sanitizers/generic/generic-string-sanitizer-adapter';
import { JwtTokenAdapter } from '~/common/adapters/security/jwt-token-adapter';
import { objectKeyExists } from '~/common/helpers/objects/object-key-exists';

export class IsAuthenticatedMiddleware implements Middleware {
  constructor(private readonly jwtTokenAdapter: JwtTokenAdapter) {}

  async handleRequest(request: MiddlewareRequestModel): Promise<void> | never {
    if (
      !objectKeyExists(request, 'headers') ||
      !objectKeyExists(request.headers, 'authorization')
    ) {
      throw new UnauthorizedError('Invalid request');
    }

    const { authorization } = request.headers;
    let [, token] = authorization.split(/\s+/);
    token = genericStringSanitizerSingleton.sanitize(token);

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

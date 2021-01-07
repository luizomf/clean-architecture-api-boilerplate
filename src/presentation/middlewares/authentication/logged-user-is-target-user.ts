import { UnauthorizedError } from '~/application/errors/unauthorized-error';
import { Middleware } from '~/application/ports/middlewares/middleware';
import { FindOneUserWithRoles } from '~/application/ports/repositories/user/find-user-with-roles-repository';
import { MiddlewareRequestModel } from '~/application/ports/requests/middleware-request-model';

export class LoggedUserIsTargetUserMiddleware implements Middleware {
  constructor(private readonly findOneUserWithRoles: FindOneUserWithRoles) {}

  async handleRequest(request: MiddlewareRequestModel): Promise<void> | never {
    if (!request || !request.headers || !request.headers.userId) {
      throw new UnauthorizedError('Not allowed');
    }

    const loggedUserId = `${request.headers.userId}`;

    const foundUser = await this.findOneUserWithRoles.findOneWithRoles(
      loggedUserId,
    );

    if (!foundUser) {
      throw new UnauthorizedError('Not allowed');
    }

    if (foundUser.roles) {
      const isAdmin = foundUser.roles.find((role) => role.name === 'admin');
      if (isAdmin) return;
    }

    if (!request.params || !request.params.id) {
      throw new UnauthorizedError('Not allowed');
    }

    const targetUserId = `${foundUser.id}`;

    if (loggedUserId !== targetUserId) {
      throw new UnauthorizedError(
        'You are not allowed to manipulate target user',
      );
    }
  }
}

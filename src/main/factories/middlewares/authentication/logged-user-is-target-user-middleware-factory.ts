import { findOneUserWithRoles } from '~/infrastructure/repositories/user/user-default-repository';
import { LoggedUserIsTargetUserMiddleware } from '~/presentation/middlewares/authentication/logged-user-is-target-user';

export const loggedUserIdTargetUserMiddlewareFactory = () => {
  const loggedUserIsTargetUserMiddleware = new LoggedUserIsTargetUserMiddleware(
    findOneUserWithRoles,
  );

  return {
    loggedUserIsTargetUserMiddleware,
  };
};

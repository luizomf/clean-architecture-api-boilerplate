import { jwtTokenAdapterSingleton } from '~/common/adapters/security/jwt-token-adapter';
import { IsAuthenticatedMiddleware } from '~/presentation/middlewares/authentication/is-authenticated';

export const isAuthenticatedMiddlewareFactory = () => {
  const jwtAdapter = jwtTokenAdapterSingleton;
  const isAuthenticatedMiddleware = new IsAuthenticatedMiddleware(jwtAdapter);

  return {
    isAuthenticatedMiddleware,
  };
};

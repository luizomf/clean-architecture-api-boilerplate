import { jwtTokenAdapterSingleton } from '~/common/adapters/security/jwt-token-adapter';
import { MiddlewareIsAuthenticated } from '~/presentation/middlewares/authentication/is-authenticated';

export const middlewareIsAuthenticatedFactory = () => {
  const jwtAdapter = jwtTokenAdapterSingleton;
  const middlewareIsAuthenticated = new MiddlewareIsAuthenticated(jwtAdapter);

  return {
    middlewareIsAuthenticated,
  };
};

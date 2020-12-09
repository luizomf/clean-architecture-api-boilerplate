import { RefreshToken } from '~/application/use-cases/token/refresh-token';
import { jwtTokenAdapterSingleton } from '~/common/adapters/security/jwt-token-adapter';
import { SignInResponseModel } from '~/domain/models/sign-in/sign-in-response-model';
import {
  createTokenRepository,
  findByTokenRepository,
} from '~/infrastructure/repositories/token/token-default-repository';
import { RefreshTokenController } from '~/presentation/controllers/token/refresh-token-controller';
import { GenericCreatedPresenter } from '~/presentation/presenters/responses/generic/generic-created-presenter';

export const refreshUserControllerFactory = () => {
  const jwtAdapter = jwtTokenAdapterSingleton;
  const refreshTokenUseCase = new RefreshToken(
    createTokenRepository,
    findByTokenRepository,
    jwtAdapter,
  );
  const createdPresenter = new GenericCreatedPresenter<SignInResponseModel>();
  const refreshTokenController = new RefreshTokenController(
    refreshTokenUseCase,
    createdPresenter,
  );

  return {
    refreshTokenController,
  };
};

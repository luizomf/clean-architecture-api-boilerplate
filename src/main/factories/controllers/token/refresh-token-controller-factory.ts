import { RefreshToken } from '~/application/use-cases/token/refresh-token';
import { jwtTokenAdapterSingleton } from '~/common/adapters/security/jwt-token-adapter';
import { SignInResponseModel } from '~/domain/models/sign-in/sign-in-response-model';
import {
  createTokenRepository,
  findByTokenRepository,
} from '~/infrastructure/repositories/token/token-default-repository';
import { RefreshTokenController } from '~/presentation/controllers/token/refresh-token-controller';
import { GenericCreatedResponse } from '~/presentation/responses/generic-created-response';

export const refreshUserControllerFactory = () => {
  const jwtAdapter = jwtTokenAdapterSingleton;
  const refreshTokenUseCase = new RefreshToken(
    createTokenRepository,
    findByTokenRepository,
    jwtAdapter,
  );
  const createdPresenter = new GenericCreatedResponse<SignInResponseModel>();
  const refreshTokenController = new RefreshTokenController(
    refreshTokenUseCase,
    createdPresenter,
  );

  return {
    refreshTokenController,
  };
};

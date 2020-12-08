import { SignInResponseModel } from '~/domain/models/sign-in/sign-in-response-model';

export interface RefreshTokenUseCase {
  refresh(refreshToken: string): Promise<SignInResponseModel> | never;
}

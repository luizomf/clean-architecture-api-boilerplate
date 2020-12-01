import { SignInRequestModel } from '~/domain/sign-in/models/sign-in-request-model';
import { SignInResponseModel } from '~/domain/sign-in/models/sign-in-response-model';

export interface SignInUseCase {
  verify(signInModel: SignInRequestModel): Promise<SignInResponseModel> | never;
}

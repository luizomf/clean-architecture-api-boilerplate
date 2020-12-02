import { SignInRequestModel } from '~/domain/models/sign-in/sign-in-request-model';
import { SignInResponseModel } from '~/domain/models/sign-in/sign-in-response-model';

export interface SignInUseCase {
  verify(signInModel: SignInRequestModel): Promise<SignInResponseModel> | never;
}

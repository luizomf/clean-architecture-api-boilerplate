import { SignInModel } from '~/domain/sign-in/models/sign-in-model';

export interface SignInUseCase {
  verify(signInModel: SignInModel): Promise<string> | never;
}

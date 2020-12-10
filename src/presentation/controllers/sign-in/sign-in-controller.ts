import { RequestValidationError } from '~/application/errors/request-validation-error';
import { UnauthorizedError } from '~/application/errors/unauthorized-error';
import { Controller } from '~/application/ports/controllers/controller';
import { Presenter } from '~/application/ports/presenters/presenter';
import { RequestModel } from '~/application/ports/requests/request-model';
import { ResponseModel } from '~/application/ports/responses/response-model';
import { SignInUseCase } from '~/domain/use-cases/sign-in/sign-in-use-case';
import { SignInRequestModel } from '~/domain/models/sign-in/sign-in-request-model';
import { SignInResponseModel } from '~/domain/models/sign-in/sign-in-response-model';
import { isString } from '~/common/helpers/strings/is_string';

export class SignInController
  implements Controller<SignInResponseModel | never> {
  constructor(
    private readonly signInUseCase: SignInUseCase,
    private readonly presenter: Presenter<SignInResponseModel>,
  ) {}

  async handleRequest(
    signInModel: RequestModel<SignInRequestModel>,
  ): Promise<ResponseModel<SignInResponseModel>> | never {
    if (!signInModel || !signInModel.body) {
      throw new RequestValidationError('Invalid request');
    }

    const { email, password } = signInModel.body;
    const emailOrPasswordIsEmpty = !email || !password;
    const valuesAreNotStrings = !isString(email) || !isString(password);

    if (emailOrPasswordIsEmpty || valuesAreNotStrings) {
      throw new UnauthorizedError('Missing e-mail or password');
    }

    const jwtToken = await this.signInUseCase.verify(signInModel.body);

    return await this.presenter.response(jwtToken);
  }
}

import { RequestValidationError } from '~/application/errors/request-validation-error';
import { UnauthorizedError } from '~/application/errors/unauthorized-error';
import { Controller } from '~/application/ports/controllers/controller';
import { ResponseHandler } from '~/application/ports/responses/response-handler';
import { RequestModel } from '~/application/ports/requests/request-model';
import { ResponseModel } from '~/application/ports/responses/response-model';
import { SignInUseCase } from '~/domain/use-cases/sign-in/sign-in-use-case';
import { SignInRequestModel } from '~/domain/models/sign-in/sign-in-request-model';
import { SignInResponseModel } from '~/domain/models/sign-in/sign-in-response-model';
import { isString } from '~/common/helpers/strings/is_string';
import { genericStringSanitizerSingleton } from '~/common/adapters/sanitizers/generic/generic-string-sanitizer-adapter';

export class SignInController
  implements Controller<SignInResponseModel | never> {
  constructor(
    private readonly signInUseCase: SignInUseCase,
    private readonly presenter: ResponseHandler<SignInResponseModel>,
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

    const sanitizedValues = {
      email: genericStringSanitizerSingleton.sanitize(email),
      password: genericStringSanitizerSingleton.sanitize(password),
    };

    const jwtToken = await this.signInUseCase.verify(sanitizedValues);

    return await this.presenter.response(jwtToken);
  }
}

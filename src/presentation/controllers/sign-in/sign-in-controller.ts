import { RequestValidationError } from '~/application/errors/request-validation-error';
import { Controller } from '~/application/ports/controllers/controller';
import { Presenter } from '~/application/ports/presenters/presenter';
import { RequestModel } from '~/application/ports/requests/request-model';
import { ResponseModel } from '~/application/ports/responses/response-model';
import { SignInUseCase } from '~/application/ports/use-cases/sign-in/sign-in-use-case';
import { SignInModel } from '~/domain/sign-in/models/sign-in-model';

export class SignInController implements Controller<string | never> {
  constructor(
    private readonly signInUseCase: SignInUseCase,
    private readonly presenter: Presenter<string>,
  ) {}

  async handleRequest(
    signInModel: RequestModel<SignInModel>,
  ): Promise<ResponseModel<string>> | never {
    if (!signInModel || !signInModel.body) {
      throw new RequestValidationError('Invalid request');
    }

    if (!signInModel.body.email || !signInModel.body.password) {
      throw new RequestValidationError('Missing e-mail or password');
    }

    const jwtToken = await this.signInUseCase.verify(signInModel.body);

    return await this.presenter.response(jwtToken);
  }
}

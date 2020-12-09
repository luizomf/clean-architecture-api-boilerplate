import { RequestValidationError } from '~/application/errors/request-validation-error';
import { Controller } from '~/application/ports/controllers/controller';
import { Presenter } from '~/application/ports/presenters/presenter';
import { RequestModel } from '~/application/ports/requests/request-model';
import { ResponseModel } from '~/application/ports/responses/response-model';
import { SignInResponseModel } from '~/domain/models/sign-in/sign-in-response-model';
import { RefreshTokenUseCase } from '~/domain/use-cases/token/refresh-token-use-case';

type ControllerType = Controller<SignInResponseModel | never>;
type ResponseType = Promise<ResponseModel<SignInResponseModel>> | never;
type RequestType = RequestModel<{ token: string }>;

export class RefreshTokenController implements ControllerType {
  constructor(
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly presenter: Presenter<SignInResponseModel>,
  ) {}

  async handleRequest(requestModel: RequestType): ResponseType {
    if (!requestModel || !requestModel.body || !requestModel.body.token) {
      throw new RequestValidationError('Invalid request');
    }

    const { token } = requestModel.body;
    const response = await this.refreshTokenUseCase.refresh(token);

    return await this.presenter.response(response);
  }
}

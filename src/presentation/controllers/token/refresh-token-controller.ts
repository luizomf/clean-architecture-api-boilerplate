import { RequestValidationError } from '~/application/errors/request-validation-error';
import { Controller } from '~/application/ports/controllers/controller';
import { ResponseHandler } from '~/application/ports/responses/response-handler';
import { RequestModel } from '~/application/ports/requests/request-model';
import { ResponseModel } from '~/application/ports/responses/response-model';
import { genericStringSanitizerSingleton } from '~/common/adapters/sanitizers/generic/generic-string-sanitizer-adapter';
import { isString } from '~/common/helpers/strings/is_string';
import { SignInResponseModel } from '~/domain/models/sign-in/sign-in-response-model';
import { RefreshTokenUseCase } from '~/domain/use-cases/token/refresh-token-use-case';

type ControllerType = Controller<SignInResponseModel | never>;
type ResponseType = Promise<ResponseModel<SignInResponseModel>> | never;
type RequestType = RequestModel<{ token: string }>;

export class RefreshTokenController implements ControllerType {
  constructor(
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly presenter: ResponseHandler<SignInResponseModel>,
  ) {}

  async handleRequest(requestModel: RequestType): ResponseType {
    if (!requestModel || !requestModel.body || !requestModel.body.token) {
      throw new RequestValidationError('Invalid request');
    }

    const { token } = requestModel.body;

    if (!isString(token)) {
      throw new RequestValidationError('Invalid token');
    }

    const sanitizedToken = genericStringSanitizerSingleton.sanitize(token);
    const response = await this.refreshTokenUseCase.refresh(sanitizedToken);

    return await this.presenter.response(response);
  }
}

import { RequestValidationError } from '~/application/errors/request-validation-error';
import { Controller } from '~/application/ports/controllers/controller';
import { ResponseHandler } from '~/application/ports/responses/response-handler';
import { RequestModel } from '~/application/ports/requests/request-model';
import { ResponseModel } from '~/application/ports/responses/response-model';
import { genericStringSanitizerSingleton } from '~/common/adapters/sanitizers/generic/generic-string-sanitizer-adapter';
import { DeleteUserByIdUseCase } from '~/domain/use-cases/user/delete-user-by-id-use-case';

export class DeleteUserByIdController implements Controller<void | never> {
  constructor(
    private readonly deleteUserByIdUseCase: DeleteUserByIdUseCase,
    private readonly presenter: ResponseHandler<void>,
  ) {}

  async handleRequest(
    requestModel: RequestModel<void, { id: string }>,
  ): Promise<ResponseModel<void>> | never {
    if (!requestModel || !requestModel.params || !requestModel.params.id) {
      throw new RequestValidationError('Missing params');
    }

    const sanitizedId = genericStringSanitizerSingleton.sanitize(
      requestModel.params.id,
    );

    await this.deleteUserByIdUseCase.deleteById(sanitizedId);
    return await this.presenter.response();
  }
}

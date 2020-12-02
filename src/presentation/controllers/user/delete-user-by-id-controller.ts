import { RequestValidationError } from '~/application/errors/request-validation-error';
import { Controller } from '~/application/ports/controllers/controller';
import { Presenter } from '~/application/ports/presenters/presenter';
import { RequestModel } from '~/application/ports/requests/request-model';
import { ResponseModel } from '~/application/ports/responses/response-model';
import { DeleteUserByIdUseCase } from '~/domain/use-cases/user/delete-user-by-id-use-case';

export class DeleteUserByIdController implements Controller<void | never> {
  constructor(
    private readonly deleteUserByIdUseCase: DeleteUserByIdUseCase,
    private readonly presenter: Presenter<void>,
  ) {}

  async handleRequest(
    requestModel: RequestModel<void, { id: string }>,
  ): Promise<ResponseModel<void>> | never {
    if (!requestModel || !requestModel.params || !requestModel.params.id) {
      throw new RequestValidationError('Missing params');
    }

    await this.deleteUserByIdUseCase.deleteById(requestModel.params.id);
    return await this.presenter.response();
  }
}

import { Controller } from '~/application/ports/controllers/controller';
import { Presenter } from '~/application/ports/presenters/presenter';
import { RequestModel } from '~/domain/ports/requests/request-model';
import { ResponseModel } from '~/domain/ports/responses/response-model';
import { DeleteUserByIdUseCase } from '~/domain/user/use-cases/delete-user-by-id-use-case';
import { ValidationComposite } from '~/domain/ports/validation/validation-composite';

export class DeleteUserByIdController implements Controller<void> {
  constructor(
    private readonly deleteUserByIdUseCase: DeleteUserByIdUseCase,
    private readonly validation: ValidationComposite,
    private readonly presenter: Presenter<void>,
  ) {}

  async handleRequest(
    requestModel: RequestModel,
  ): Promise<ResponseModel<void>> {
    await this.validation.validate(requestModel);
    await this.deleteUserByIdUseCase.deleteById(requestModel.params.id);
    return await this.presenter.response();
  }
}

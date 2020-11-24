import { Controller } from '~/application/ports/controllers/controller';
import { Presenter } from '~/application/ports/presenters/presenter';
import { RequestModel } from '~/application/ports/request/request-model';
import { ResponseModel } from '~/application/ports/response/response-model';
import { DeleteUserByIdUseCase } from '~/application/ports/user/delete-user-by-id-use-case';
import { ValidationComposite } from '~/application/ports/validators/validation-composite';

export class DeleteUserByIdController implements Controller<void> {
  constructor(
    private readonly deleteUserByIdUseCase: DeleteUserByIdUseCase,
    private readonly validation: ValidationComposite,
    private readonly presenter: Presenter<void | never>,
  ) {}

  async handleRequest(
    requestModel: RequestModel,
  ): Promise<ResponseModel<void>> {
    await this.validation.validate(requestModel);
    await this.deleteUserByIdUseCase.deleteById(requestModel.params.id);
    return this.presenter.response();
  }
}

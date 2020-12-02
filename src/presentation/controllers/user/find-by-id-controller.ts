import { User } from '~/domain/models/user/user';
import { RequestModel } from '~/application/ports/requests/request-model';
import { Presenter } from '~/application/ports/presenters/presenter';
import { Controller } from '~/application/ports/controllers/controller';
import { FindUserByIdUseCase } from '~/domain/use-cases/user/find-user-by-id-use-case';
import { RequestValidationError } from '~/application/errors/request-validation-error';

export class FindUserByIdController implements Controller<User | never> {
  constructor(
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly presenter: Presenter<User>,
  ) {}

  async handleRequest(requestModel: RequestModel<void, { id: string }>) {
    if (!requestModel || !requestModel.params || !requestModel.params.id) {
      throw new RequestValidationError('Missing params');
    }

    const { id } = requestModel.params;
    const user = await this.findUserByIdUseCase.findById(id);
    return await this.presenter.response(user);
  }
}

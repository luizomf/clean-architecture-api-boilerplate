import { User } from '~/domain/user/entities/user';
import { RequestModel } from '~/application/ports/requests/request-model';
import { Presenter } from '~/application/ports/presenters/presenter';
import { Controller } from '~/application/ports/controllers/controller';
import { FindUserByIdUseCase } from '~/application/ports/use-cases/user/find-user-by-id-use-case';
import { RequestValidationError } from '~/application/errors/request-validation-error';

export class FindUserByIdController implements Controller<User | never> {
  constructor(
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly presenter: Presenter<User>,
  ) {}

  async handleRequest(requestModel: RequestModel) {
    if (!requestModel || !requestModel.params || !requestModel.params.id) {
      throw new RequestValidationError('Missing params');
    }

    const { id } = requestModel.params;
    const user = await this.findUserByIdUseCase.findById(id);
    return await this.presenter.response(user);
  }
}

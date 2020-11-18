import { User } from '~/domain/user/user';
import { RequestModel } from '~/application/ports/request/request-model';
import { ValidationComposite } from '~/application/ports/validators/validation-composite';
import { Presenter } from '~/application/ports/presenters/presenter';
import { Controller } from '~/application/ports/controllers/controller';
import { FindUserByIdUseCase } from '~/application/ports/user/find-user-by-id-use-case';

export class FindUserByIdController implements Controller<User> {
  constructor(
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly validation: ValidationComposite,
    private readonly presenter: Presenter<User>,
  ) {}

  async handleRequest(requestModel: RequestModel) {
    await this.validation.validate(requestModel);
    const { id } = requestModel.params;
    const user = await this.findUserByIdUseCase.findById(id);
    return this.presenter.response(user);
  }
}

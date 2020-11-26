import { User } from '~/domain/user/models/user';
import { RequestModel } from '~/application/ports/requests/request-model';
import { ValidationComposite } from '~/application/ports/validators/validation-composite';
import { Presenter } from '~/application/ports/presenters/presenter';
import { Controller } from '~/application/ports/controllers/controller';
import { FindUserByIdUseCase } from '~/domain/user/use-cases/find-user-by-id-use-case';

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
    return await this.presenter.response(user);
  }
}

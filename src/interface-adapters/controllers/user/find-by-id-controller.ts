import { User } from '~/domain/user/entities/user';
import { RequestModel } from '~/domain/ports/requests/request-model';
import { ValidationComposite } from '~/domain/ports/validation/validation-composite';
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

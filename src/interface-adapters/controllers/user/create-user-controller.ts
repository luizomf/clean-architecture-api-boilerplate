import { Controller } from '~/application/ports/controllers/controller';
import { Presenter } from '~/application/ports/presenters/presenter';
import { RequestModel } from '~/application/ports/request/request-model';
import { CreateUserRequestWithPasswordString } from '~/application/ports/user/models/create-user-request-model';
import { CreateUserUseCase } from '~/application/ports/user/use-cases/create-user-use-case';
import { ValidationComposite } from '~/application/ports/validators/validation-composite';
import { User } from '~/domain/user/user';

export class CreateUserController implements Controller<User> {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly validation: ValidationComposite,
    private readonly presenter: Presenter<User>,
  ) {}

  async handleRequest(
    requestModel: RequestModel<CreateUserRequestWithPasswordString>,
  ) {
    await this.validation.validate(requestModel);
    const user = await this.createUser.create(
      requestModel.body as CreateUserRequestWithPasswordString,
    );
    return await this.presenter.response(user);
  }
}

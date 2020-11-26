import { Controller } from '~/application/ports/controllers/controller';
import { Presenter } from '~/application/ports/presenters/presenter';
import { RequestModel } from '~/application/ports/requests/request-model';
import { CreateUserRequestWithPasswordString } from '~/domain/user/models/create-user-request-model';
import { CreateUserUseCase } from '~/domain/user/use-cases/create-user-use-case';
import { ValidationComposite } from '~/application/ports/validation/validation-composite';
import { User } from '~/domain/user/entities/user';

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

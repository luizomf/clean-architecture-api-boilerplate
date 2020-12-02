import { Controller } from '~/application/ports/controllers/controller';
import { Presenter } from '~/application/ports/presenters/presenter';
import { RequestModel } from '~/application/ports/requests/request-model';
import { UserRequestWithPasswordString } from '~/domain/models/user/user-request-required-fields';
import { CreateUserUseCase } from '~/domain/use-cases/user/create-user-use-case';
import { User } from '~/domain/models/user/user';
import { RequestValidationError } from '~/application/errors/request-validation-error';

export class CreateUserController implements Controller<User | never> {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly presenter: Presenter<User>,
  ) {}

  async handleRequest(
    requestModel: RequestModel<UserRequestWithPasswordString>,
  ) {
    if (!requestModel || !requestModel.body) {
      throw new RequestValidationError('Missing body');
    }

    const user = await this.createUser.create(
      requestModel.body as UserRequestWithPasswordString,
    );
    return await this.presenter.response(user);
  }
}

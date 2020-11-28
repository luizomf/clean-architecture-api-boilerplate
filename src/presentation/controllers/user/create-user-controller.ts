import { Controller } from '~/application/ports/controllers/controller';
import { Presenter } from '~/application/ports/presenters/presenter';
import { RequestModel } from '~/application/ports/requests/request-model';
import { CreateUserRequestWithPasswordString } from '~/domain/user/models/create-user-request-model';
import { CreateUserUseCase } from '~/application/ports/use-cases/user/create-user-use-case';
import { User } from '~/domain/user/entities/user';
import { RequestValidationError } from '~/application/errors/request-validation-error';

export class CreateUserController implements Controller<User | never> {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly presenter: Presenter<User>,
  ) {}

  async handleRequest(
    requestModel: RequestModel<CreateUserRequestWithPasswordString>,
  ) {
    if (!requestModel || !requestModel.body) {
      throw new RequestValidationError('Missing body');
    }

    const user = await this.createUser.create(
      requestModel.body as CreateUserRequestWithPasswordString,
    );
    return await this.presenter.response(user);
  }
}

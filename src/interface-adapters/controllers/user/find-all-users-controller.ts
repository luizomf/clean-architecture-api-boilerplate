import { Controller } from '~/application/ports/controllers/controller';
import { Presenter } from '~/application/ports/presenters/presenter';
import { FindAllUsersUseCase } from '~/domain/user/use-cases/find-all-users-use-case';
import { ValidationComposite } from '~/application/ports/validators/validation-composite';
import { User } from '~/domain/user/models/user';
import { RequestModel } from '~/application/ports/requests/request-model';

type FindAllUsersRequestModel = RequestModel<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  {
    order?: 'desc' | 'asc';
    limit?: number;
    offset?: number;
  }
>;

export class FindAllUsersController implements Controller<User[] | never> {
  constructor(
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly findAllUsersValidation: ValidationComposite,
    private readonly findAllUsersPresenter: Presenter<User[]>,
  ) {}

  async handleRequest(requestModel: FindAllUsersRequestModel) {
    await this.findAllUsersValidation.validate(requestModel);

    let order: 'desc' | 'asc' = 'desc';
    let limit = 100;
    let offset = 0;

    if (requestModel.query && requestModel.query.order) {
      order = requestModel.query.order;
    }

    if (requestModel.query && requestModel.query.limit) {
      limit = +requestModel.query.limit;
    }

    if (requestModel.query && requestModel.query.offset) {
      offset = +requestModel.query.offset;
    }

    const users = await this.findAllUsersUseCase.findAll(order, limit, offset);
    return this.findAllUsersPresenter.response(users);
  }
}

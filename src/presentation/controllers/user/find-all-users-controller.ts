import { Controller } from '~/application/ports/controllers/controller';
import { ResponseHandler } from '~/application/ports/responses/response-handler';
import { User } from '~/domain/models/user/user';
import { RequestModel } from '~/application/ports/requests/request-model';
import { FindAllUsersUseCase } from '~/domain/use-cases/user/find-all-users-use-case';

type FindAllUsersRequestModel = RequestModel<
  void,
  void,
  {
    order?: 'desc' | 'asc';
    limit?: number;
    offset?: number;
  }
>;

export class FindAllUsersController implements Controller<User[] | never> {
  constructor(
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly findAllUsersPresenter: ResponseHandler<User[]>,
  ) {}

  async handleRequest(requestModel?: FindAllUsersRequestModel) {
    let query: FindAllUsersRequestModel['query'];

    if (requestModel && requestModel.query) {
      query = requestModel.query;
    }

    const users = await this.findAllUsersUseCase.findAll(query);
    return this.findAllUsersPresenter.response(users);
  }
}

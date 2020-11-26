import { Presenter } from '~/application/ports/presenters/presenter';
import { ResponseModel } from '~/application/ports/responses/response-model';
import { User } from '~/domain/user/models/user';

export class SuccessUserPresenter implements Presenter {
  async response(body: User): Promise<ResponseModel<User>> {
    return {
      statusCode: 200,
      body,
    };
  }
}

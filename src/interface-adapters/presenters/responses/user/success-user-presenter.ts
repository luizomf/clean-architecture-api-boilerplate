import { Presenter } from '~/application/ports/presenters/presenter';
import { ResponseModel } from '~/domain/ports/responses/response-model';
import { User } from '~/domain/user/entities/user';

export class SuccessUserPresenter implements Presenter {
  async response(body: User): Promise<ResponseModel<User>> {
    return {
      statusCode: 200,
      body,
    };
  }
}

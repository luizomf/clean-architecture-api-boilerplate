import { Presenter } from '~/application/ports/presenters/presenter';
import { ResponseModel } from '~/application/ports/responses/response-model';
import { User } from '~/domain/user/entities/user';

export class CreatedUserPresenter implements Presenter {
  async response(body: User): Promise<ResponseModel<User>> {
    return {
      statusCode: 201,
      body,
    };
  }
}

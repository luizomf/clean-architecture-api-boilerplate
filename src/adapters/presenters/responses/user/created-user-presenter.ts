import { Presenter } from '~/application/ports/presenters/presenter';
import { ResponseModel } from '~/application/ports/response/response-model';
import { User } from '~/domain/user/user';

export class CreatedUserPresenter implements Presenter {
  async response(body: User): Promise<ResponseModel<User>> {
    delete body.password_hash;

    return {
      statusCode: 201,
      body,
    };
  }
}

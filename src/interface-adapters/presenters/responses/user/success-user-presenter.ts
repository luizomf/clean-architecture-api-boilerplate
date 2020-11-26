import { Presenter } from '~/application/ports/presenters/presenter';
import { ResponseModel } from '~/application/ports/responses/response-model';
import { UserEntity } from '~/domain/user/entities/user';

export class SuccessUserPresenter implements Presenter {
  async response(body: UserEntity): Promise<ResponseModel<UserEntity>> {
    return {
      statusCode: 200,
      body,
    };
  }
}

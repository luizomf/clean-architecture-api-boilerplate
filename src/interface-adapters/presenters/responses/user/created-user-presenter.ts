import { Presenter } from '~/application/ports/presenters/presenter';
import { ResponseModel } from '~/application/ports/responses/response-model';
import { UserEntity } from '~/domain/user/entities/user';

export class CreatedUserPresenter implements Presenter {
  async response(body: UserEntity): Promise<ResponseModel<UserEntity>> {
    return {
      statusCode: 201,
      body,
    };
  }
}

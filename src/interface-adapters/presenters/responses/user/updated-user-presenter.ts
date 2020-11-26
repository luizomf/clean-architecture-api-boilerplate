import { Presenter } from '~/application/ports/presenters/presenter';
import { ResponseModel } from '~/application/ports/response/response-model';

export class UpdatedUserPresenter implements Presenter {
  async response(body: void): Promise<ResponseModel<void>> {
    return {
      statusCode: 204,
      body,
    };
  }
}

import { Presenter } from '~/application/ports/presenters/presenter';
import { ResponseModel } from '~/application/ports/response/response-model';

export class DeletedUserPresenter implements Presenter {
  async response(body: number): Promise<ResponseModel<number>> {
    return {
      statusCode: 200,
      body,
    };
  }
}

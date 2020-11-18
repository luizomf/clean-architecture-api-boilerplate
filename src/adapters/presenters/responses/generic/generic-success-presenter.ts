import { Presenter } from '~/application/ports/presenters/presenter';
import { ResponseModel } from '~/application/ports/response/response-model';

export class GenericSuccessPresenter<T> implements Presenter<T> {
  async response(body: T): Promise<ResponseModel<T>> {
    return {
      statusCode: 200,
      body,
    };
  }
}

import { Presenter } from '~/application/ports/presenters/presenter';
import { ResponseModel } from '~/application/ports/responses/response-model';

export class GenericCreatedPresenter<T> implements Presenter<T> {
  async response(body: T): Promise<ResponseModel<T>> {
    const responseData = {
      statusCode: 201,
      body,
    };

    return responseData;
  }
}

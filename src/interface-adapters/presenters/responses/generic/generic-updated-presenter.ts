import { Presenter } from '~/application/ports/presenters/presenter';
import { ResponseModel } from '~/application/ports/responses/response-model';

export class GenericUpdatedPresenter implements Presenter<void> {
  async response(): Promise<ResponseModel<void>> {
    const responseData = {
      statusCode: 204,
      body: undefined,
    };

    return responseData;
  }
}

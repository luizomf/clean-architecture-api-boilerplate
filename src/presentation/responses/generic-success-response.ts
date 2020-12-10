import { ResponseHandler } from '~/application/ports/responses/response-handler';
import { ResponseModel } from '~/application/ports/responses/response-model';

export class GenericSuccessResponse<T> implements ResponseHandler<T> {
  async response(body: T): Promise<ResponseModel<T>> {
    return {
      statusCode: 200,
      body,
    };
  }
}

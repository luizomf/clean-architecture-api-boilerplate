import { RequestModel } from '~/application/ports/requests/request-model';
import { ResponseModel } from '~/application/ports/responses/response-model';

export interface Controller<T> {
  handleRequest(requestModel: RequestModel): Promise<ResponseModel<T>>;
}

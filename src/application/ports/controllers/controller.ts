import { RequestModel } from '~/domain/ports/requests/request-model';
import { ResponseModel } from '~/domain/ports/responses/response-model';

export interface Controller<T> {
  handleRequest(requestModel: RequestModel): Promise<ResponseModel<T>>;
}

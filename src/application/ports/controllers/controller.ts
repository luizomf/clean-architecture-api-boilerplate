import { RequestModel } from '../requests/request-model';
import { ResponseModel } from '../responses/response-model';

export interface Controller<T> {
  handleRequest(requestModel: RequestModel): Promise<ResponseModel<T>>;
}

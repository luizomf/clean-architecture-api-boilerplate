import { RequestModel } from '../request/request-model';
import { ResponseModel } from '../response/response-model';

export interface Controller<T> {
  handleRequest(requestModel: RequestModel): Promise<ResponseModel<T>>;
}

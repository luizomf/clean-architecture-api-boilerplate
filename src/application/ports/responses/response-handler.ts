import { ResponseModel } from './response-model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ResponseHandler<T = any> {
  response(body: T): Promise<ResponseModel<T>>;
}

import { ResponseModel } from '../../../domain/ports/responses/response-model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Presenter<T = any> {
  response(body: T): Promise<ResponseModel<T>>;
}

import { RequestModel } from '~/application/ports/requests/request-model';

export interface Middleware {
  execute(requestModel: RequestModel): Promise<void> | never;
}

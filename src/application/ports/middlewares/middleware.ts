import { MiddlewareRequestModel } from '../requests/middleware-request-model';

export interface Middleware {
  execute(requestModel: MiddlewareRequestModel): Promise<void> | never;
}

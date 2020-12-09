import { MiddlewareRequestModel } from '../requests/middleware-request-model';

export interface Middleware {
  handleRequest(requestModel: MiddlewareRequestModel): Promise<void> | never;
}

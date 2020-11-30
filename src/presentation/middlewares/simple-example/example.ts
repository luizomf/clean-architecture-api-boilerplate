import { Middleware } from '~/application/ports/middlewares/middleware';
import { RequestModel } from '~/application/ports/requests/request-model';

export class MiddlewareExample implements Middleware {
  async execute(request: RequestModel): Promise<void> | never {
    request.headers.testing = 'seems ok';
  }
}

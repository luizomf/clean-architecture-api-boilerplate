import { NextFunction, Request, Response } from 'express';
import { DefaultApplicationError } from '~/application/errors/default-application-error';
import { Middleware } from '~/application/ports/middlewares/middleware';

export const expressMiddlewareAdapter = (middleware: Middleware) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    return Promise.resolve(
      middleware.execute({
        query: request.query,
        params: request.params,
        body: request.body,
        headers: request.headers,
      }),
    )
      .then(() => {
        return next();
      })
      .catch((error: DefaultApplicationError) => {
        return next(error);
      });
  };
};

import { Handler, NextFunction, Request, Response } from 'express';
import { DefaultApplicationError } from '~/application/errors/default-application-error';

export const expressMiddlewareAdapter = (handlerFn: Handler) => {
  return (request: Request, response: Response, next: NextFunction) => {
    return Promise.resolve(handlerFn(request, response, next)).catch(
      (error: DefaultApplicationError) => {
        return next(error);
      },
    );
  };
};

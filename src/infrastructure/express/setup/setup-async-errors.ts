import { Express, Request, Response, NextFunction } from 'express';
import { DefaultApplicationError } from '~/application/errors/default-application-error';

export const setupAsyncErrors = (app: Express): void => {
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (!error) {
      return next();
    }

    if (!(error instanceof DefaultApplicationError)) {
      return res.status(500).json({
        error: error.name,
      });
    }

    return res.status(error.statusCode).json({
      error: error.name,
      message: error.message,
      statusCode: error.statusCode,
      messages: error.messages,
    });
  });
};

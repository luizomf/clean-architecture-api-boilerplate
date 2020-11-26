import { Request, Response, NextFunction } from 'express';
import { expressMiddlewareAdapter } from '../adapters/express-middleware-adapter';

export const middlewareExample = expressMiddlewareAdapter(
  async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    next();
  },
);

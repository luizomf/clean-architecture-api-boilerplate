import { Request, Response, NextFunction } from 'express';
import { expressMiddlewareAdapter } from '../../infrastructure/express/adapters/express-middleware-adapter';

export const middlewareExample = expressMiddlewareAdapter(
  async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    next();
  },
);

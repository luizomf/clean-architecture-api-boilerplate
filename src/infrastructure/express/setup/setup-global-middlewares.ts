import { Application, json } from 'express';
import helmet from 'helmet';

export const setupGlobalMiddlewares = (app: Application): void => {
  app.use(helmet());
  app.use(json());
};

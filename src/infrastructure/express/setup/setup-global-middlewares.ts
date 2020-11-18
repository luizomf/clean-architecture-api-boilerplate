import { Application, json } from 'express';

export const setupGlobalMiddlewares = (app: Application): void => {
  app.use(json());
};

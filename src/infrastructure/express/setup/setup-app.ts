import { Application } from 'express';

export const setupApp = (app: Application): void => {
  app.set('trust proxy', 1); // you may change this depending on you setup
};

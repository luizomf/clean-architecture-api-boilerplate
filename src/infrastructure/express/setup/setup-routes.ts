import { Application } from 'express';
import { middlewareExample } from '../middlewares/example';
import { userRoutes } from '../routes/user';

export const setupRoutes = (app: Application): void => {
  app.use('/users', middlewareExample, userRoutes);
};

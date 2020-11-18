import { Application } from 'express';
import { userRoutes } from '../routes/user';

export const setupRoutes = (app: Application): void => {
  app.use('/users', userRoutes);
};

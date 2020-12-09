import { Application } from 'express';
import { signInRoutes } from '../routes/sign-in';
import { refreshTokenRoutes } from '../routes/refresh-token';

import { userRoutes } from '../routes/user';

export const setupRoutes = (app: Application): void => {
  app.use('/users', userRoutes);
  app.use('/sign-in', signInRoutes);
  app.use('/refresh-token', refreshTokenRoutes);
};

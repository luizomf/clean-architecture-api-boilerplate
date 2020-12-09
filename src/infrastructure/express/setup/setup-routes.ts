import { Application } from 'express';
import { signInRoutes } from '../routes/sign-in';
import { refreshTokenRoutes } from '../routes/refresh-token';

import { userRoutes } from '../routes/user';

import { rateLimiter } from '../middlewares/rate-limit';

export const setupRoutes = (app: Application): void => {
  app.use('/users', rateLimiter, userRoutes);
  app.use('/sign-in', rateLimiter, signInRoutes);
  app.use('/refresh-token', rateLimiter, refreshTokenRoutes);
};

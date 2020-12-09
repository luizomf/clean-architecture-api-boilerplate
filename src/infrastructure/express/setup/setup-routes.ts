import { Application } from 'express';
import { signInRoutes } from '../routes/sign-in';
import { refreshTokenRoutes } from '../routes/refresh-token';

import { userRoutes } from '../routes/user';

// You can use one different rate-limit configuration per route if needed
// You can also add another store type (we're using default in memory store)
import { rateLimiter } from '../middlewares/rate-limit';

export const setupRoutes = (app: Application): void => {
  app.use('/users', rateLimiter, userRoutes);
  app.use('/sign-in', rateLimiter, signInRoutes);
  app.use('/refresh-token', rateLimiter, refreshTokenRoutes);
};

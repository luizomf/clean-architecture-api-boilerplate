import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 3 * 60 * 1000, // 3 minute
  max: 100,
  headers: false,
});

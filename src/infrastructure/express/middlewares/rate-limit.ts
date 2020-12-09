import rateLimit from 'express-rate-limit';

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

export const rateLimiter = rateLimit({
  windowMs: 3 * 60 * 1000, // 3 minute
  max: 100,
  headers: true,
});

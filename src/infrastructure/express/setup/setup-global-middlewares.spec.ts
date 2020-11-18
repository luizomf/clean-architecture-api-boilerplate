import { app } from '../server';
import request from 'supertest';

/* eslint-disable @typescript-eslint/no-explicit-any */
describe('Setup Global Middlewares', () => {
  it('should allow json in request body', async () => {
    app.post('/__test-post-to-a-route', (req, res) => {
      res.json(req.body);
    });

    await request(app)
      .post('/__test-post-to-a-route')
      .send({ name: 'name' })
      .expect(200)
      .expect({ name: 'name' });
  });
});

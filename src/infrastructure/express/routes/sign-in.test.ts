/* eslint-disable */
import request from 'supertest';
import { BCryptAdapter } from '~/common/adapters/security/bcrypt-adapter';
import { db } from '~/infrastructure/knex/connection';
import { app } from '../server';

const bcryptAdapter = new BCryptAdapter();

describe('User Routes', () => {
  beforeAll(async () => {
    await db.migrate.latest({ directory: process.env.MIGRATIONS });
    await db('users').insert({
      email: 'email@email.com',
      first_name: 'first',
      last_name: 'last',
      password_hash: await bcryptAdapter.hash('123'),
    });
  });

  afterAll(async () => {
    await db.destroy();
  });

  // it('should return a token if user exists', async () => {
  //   await request(app)
  //     .post('/sign-in')
  //     .send({ email: 'email@email.com', password: '123' })
  //     .expect(200)
  //     .then((response) => {
  //       expect(response.body).toBeTruthy();
  //     });
  // });

  // it('should return UnauthorizedError if email or password is empty', async () => {
  //   const response1 = await request(app)
  //     .post('/sign-in')
  //     .send({ email: 'email@email.com', password: '' });
  //   expect(response1.body.error).toBe('UnauthorizedError');
  //   expect(response1.body.messages).toEqual(
  //     expect.arrayContaining(['Missing e-mail or password']),
  //   );

  //   const response2 = await request(app)
  //     .post('/sign-in')
  //     .send({ email: '', password: '123' });
  //   expect(response2.body.error).toBe('UnauthorizedError');
  //   expect(response2.body.messages).toEqual(
  //     expect.arrayContaining(['Missing e-mail or password']),
  //   );
  // });

  // it('should return UnauthorizedError if password is incorrect', async () => {
  //   const response1 = await request(app)
  //     .post('/sign-in')
  //     .send({ email: 'email@email.com', password: '1234' });
  //   expect(response1.body.error).toBe('UnauthorizedError');
  //   expect(response1.body.messages).toEqual(
  //     expect.arrayContaining(['Invalid credentials']),
  //   );
  // });

  // it('should return UnauthorizedError email or password is missing', async () => {
  //   const response1 = await request(app).post('/sign-in').send();
  //   expect(response1.body.error).toBe('UnauthorizedError');
  //   expect(response1.body.messages).toEqual(
  //     expect.arrayContaining(['Missing e-mail or password']),
  //   );
  // });

  it('should test', async () => {});
});

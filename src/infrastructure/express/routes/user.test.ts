import request from 'supertest';
import { db } from '~/infrastructure/knex/connection';
import { app } from '../server';

describe('User Routes', () => {
  beforeAll(async () => {
    await db.migrate.latest({ directory: process.env.MIGRATIONS });
  });

  afterAll(async () => {
    await db.destroy();
  });

  it('should create users with no errors if everything is OK', async () => {
    await request(app)
      .post('/users')
      .send({
        first_name: 'first_name1',
        last_name: 'last_name1',
        email: 'email1@email.com',
        password: 'password1',
        confirmPassword: 'password1',
      })
      .expect({
        id: '1',
        first_name: 'first_name1',
        last_name: 'last_name1',
        email: 'email1@email.com',
      });

    await request(app)
      .post('/users')
      .send({
        first_name: 'first_name2',
        last_name: 'last_name2',
        email: 'email2@email.com',
        password: 'password2',
        confirmPassword: 'password2',
      })
      .expect({
        id: '2',
        first_name: 'first_name2',
        last_name: 'last_name2',
        email: 'email2@email.com',
      });
  });

  it('should return 400 (RequestValidationError) if request if invalid', async () => {
    await request(app)
      .post('/users')
      .send({
        // first_name: 'first_name1',
        last_name: 'last_name1',
        email: 'email1@email.com',
        password: 'password1',
        confirmPassword: 'password1',
      })
      .expect(400)
      .then((res) => expect(res.body.error).toBe('RequestValidationError'));

    await request(app)
      .post('/users')
      .send({
        first_name: 'first_name1',
        // last_name: 'last_name1',
        email: 'email1@email.com',
        password: 'password1',
        confirmPassword: 'password1',
      })
      .expect(400)
      .then((res) => expect(res.body.error).toBe('RequestValidationError'));

    await request(app)
      .post('/users')
      .send({
        first_name: 'first_name1',
        last_name: 'last_name1',
        // email: 'email1@email.com',
        password: 'password1',
        confirmPassword: 'password1',
      })
      .expect(400)
      .then((res) => expect(res.body.error).toBe('RequestValidationError'));

    await request(app)
      .post('/users')
      .send({
        first_name: 'first_name1',
        last_name: 'last_name1',
        email: 'email1@email.com',
        // password: 'password1',
        confirmPassword: 'password1',
      })
      .expect(400)
      .then((res) => expect(res.body.error).toBe('RequestValidationError'));

    await request(app)
      .post('/users')
      .send({
        first_name: 'first_name1',
        last_name: 'last_name1',
        email: 'email1@email.com',
        password: 'password1',
        // confirmPassword: 'password1',
      })
      .expect(400)
      .then((res) => expect(res.body.error).toBe('RequestValidationError'));
  });

  it('should return 400 (EmailValidationError) if email is invalid', async () => {
    await request(app)
      .post('/users')
      .send({
        first_name: 'first_name1',
        last_name: 'last_name1',
        email: 'email1email.com',
        password: 'password1',
        confirmPassword: 'password1',
      })
      .expect(400)
      .then((res) => expect(res.body.error).toBe('EmailValidationError'));
  });

  it('should return 404 if user not found', async () => {
    const response = await request(app).get('/users/abc');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('NotFoundError');
  });
});

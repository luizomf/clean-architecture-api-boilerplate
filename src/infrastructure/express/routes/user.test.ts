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
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body.id).toBeTruthy();
        expect(response.body.first_name).toBe('first_name1');
        expect(response.body.last_name).toBe('last_name1');
        expect(response.body.email).toBe('email1@email.com');
        expect(response.body.password_hash).toBeTruthy();
        expect(response.body.password_hash.length).toBe(60);
      })
      .catch((e) => {
        throw e;
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

  it('should delete a user if exists', async () => {
    await request(app)
      .post('/users')
      .send({
        first_name: 'first_name2',
        last_name: 'last_name2',
        email: 'email2@email.com',
        password: 'password2',
        confirmPassword: 'password2',
      })
      .then(async (response) => {
        const { id } = response.body;

        expect(response.status).toBe(201);

        await request(app)
          .delete(`/users/${id}`)
          .expect(204)
          .then((response) => {
            expect(response.body).toEqual({});
          })
          .catch((e) => {
            throw e;
          });
      })
      .catch((e) => {
        throw e;
      });
  });

  it('should throw if deleting a user that does not exist', async () => {
    await request(app)
      .delete('/users/abc')
      .expect(404)
      .then((response) => {
        expect(response.body.error).toBe('NotFoundError');
      });
  });

  it('should update a user if exists', async () => {
    const createResponse = await request(app).post('/users').send({
      first_name: 'first',
      last_name: 'last',
      email: 'email_11124577@email.com',
      password: '123',
      confirmPassword: '123',
    });
    const { id } = createResponse.body;

    const updateResponse = await request(app).put(`/users/${id}`).send({
      first_name: 'new_first_name',
      last_name: 'new_last_name',
      email: 'new_email123123@email.com',
    });
    expect(updateResponse.status).toBe(204);

    const findResponse = await request(app).get(`/users/${id}`);

    expect(findResponse.body.first_name).toBe('new_first_name');
    expect(findResponse.body.last_name).toBe('new_last_name');
    expect(findResponse.body.email).toBe('new_email123123@email.com');
  });
});

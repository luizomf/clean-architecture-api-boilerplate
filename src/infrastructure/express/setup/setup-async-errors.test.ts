/* eslint-disable @typescript-eslint/no-explicit-any */
import request from 'supertest';
import { DefaultApplicationError } from '~/application/errors/default-application-error';
import { EmailValidationError } from '~/application/errors/email-validation-error';
import { Controller } from '~/application/ports/controllers/controller';
import { db } from '~/infrastructure/knex/connection';
import { app } from '../server';
import { expressMiddlewareAdapter } from '../adapters/express-middleware-adapter';
import { expressRouteAdapter } from '../adapters/express-route-adapter';
import { setupAsyncErrors } from './setup-async-errors';
import { Middleware } from '~/application/ports/middlewares/middleware';

const sut = setupAsyncErrors;

const controllerMockFactory = () => {
  class ControllerMock implements Controller<any> {
    async handleRequest() {
      return { statusCode: 200, body: null };
    }
  }
  return new ControllerMock();
};

describe('Setup Async Errors', () => {
  beforeAll(async () => {
    await db.migrate.latest({ directory: process.env.MIGRATIONS });
  });

  afterAll(async () => {
    await db.destroy();
  });

  it('should set statusCode 500 and body with errors thrown', async () => {
    const controllerMock = controllerMockFactory();
    app.get('/__test-a-generic-error', expressRouteAdapter(controllerMock));
    sut(app);
    jest
      .spyOn(controllerMock, 'handleRequest')
      .mockImplementationOnce(async () => {
        throw new Error('This message is not relevant.');
      });
    const response = await request(app).get('/__test-a-generic-error');
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Error');
  });

  it('should catch errors derived from DefaultApplicationError', async () => {
    const controllerMock = controllerMockFactory();
    app.get(
      '/__test-default-application-error',
      expressRouteAdapter(controllerMock),
    );
    sut(app);
    jest
      .spyOn(controllerMock, 'handleRequest')
      .mockImplementationOnce(async () => {
        throw new DefaultApplicationError('This message is now relevant');
      });
    let response = await request(app).get('/__test-default-application-error');
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('DefaultApplicationError');
    expect(response.body.message).toBe('This message is now relevant');

    jest
      .spyOn(controllerMock, 'handleRequest')
      .mockImplementationOnce(async () => {
        throw new EmailValidationError('Another app error');
      });
    response = await request(app).get('/__test-default-application-error');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('EmailValidationError');
    expect(response.body.message).toBe('Another app error');
  });

  it('should do nothing if no error is throw', async () => {
    const controllerMock = controllerMockFactory();
    app.get('/__test-no-errors', expressRouteAdapter(controllerMock));
    sut(app);
    const response = await request(app).get('/__test-no-errors');
    expect(response.status).toBe(200);
    expect(response.body).toBeNull();
  });

  it('should catch errors on middlewares', async () => {
    const controllerMock = controllerMockFactory();
    const middlewareMock: Middleware = {
      async handleRequest() {
        throw new Error();
      },
    };
    app.get(
      '/__test-a-middleware-error',
      expressMiddlewareAdapter(middlewareMock),
      expressRouteAdapter(controllerMock),
    );
    sut(app);
    const response = await request(app).get('/__test-a-middleware-error');
    expect(response.status).toBe(500);
    expect(response.body.error).toEqual('Error');
  });
});

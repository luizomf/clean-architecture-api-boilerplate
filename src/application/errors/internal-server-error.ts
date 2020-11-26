import { DefaultApplicationError } from '~/domain/ports/errors/default-application-error';

export class InternalServerError extends DefaultApplicationError {
  name = 'InternalServerError';
  statusCode = 500;
}

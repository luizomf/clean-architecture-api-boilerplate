import { DefaultApplicationError } from '~/domain/ports/errors/default-application-error';

export class BadRequestError extends DefaultApplicationError {
  name = 'BadRequestError';
  statusCode = 400;
}

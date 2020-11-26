import { DefaultApplicationError } from '../../domain/ports/errors/default-application-error';

export class NotFoundError extends DefaultApplicationError {
  statusCode = 404;
  name = 'NotFoundError';
}

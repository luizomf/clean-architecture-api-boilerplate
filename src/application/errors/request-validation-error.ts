import { DefaultApplicationError } from '../../domain/ports/errors/default-application-error';

export class RequestValidationError extends DefaultApplicationError {
  statusCode = 400;
  name = 'RequestValidationError';
}

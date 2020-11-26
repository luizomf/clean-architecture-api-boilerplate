import { DefaultApplicationError } from '~/domain/ports/errors/default-application-error';

export class EmailValidationError extends DefaultApplicationError {
  statusCode = 400;
  name = 'EmailValidationError';
}

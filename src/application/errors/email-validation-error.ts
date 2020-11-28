import { DefaultApplicationError } from '~/application/errors/default-application-error';

export class EmailValidationError extends DefaultApplicationError {
  statusCode = 400;
  name = 'EmailValidationError';
}

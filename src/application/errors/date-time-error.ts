import { DefaultApplicationError } from '~/application/errors/default-application-error';

export class DateTimeError extends DefaultApplicationError {
  statusCode = 500;
  name = 'DateTimeError';
}

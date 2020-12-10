import { DefaultApplicationError } from '~/application/errors/default-application-error';

export class SanitizerError extends DefaultApplicationError {
  name = 'SanitizerError';
  statusCode = 400;
}

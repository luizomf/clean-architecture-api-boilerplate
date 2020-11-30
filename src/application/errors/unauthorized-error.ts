import { DefaultApplicationError } from '~/application/errors/default-application-error';

export class UnauthorizedError extends DefaultApplicationError {
  name = 'UnauthorizedError';
  statusCode = 401;
}

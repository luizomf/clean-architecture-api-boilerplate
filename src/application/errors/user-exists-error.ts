import { DefaultApplicationError } from '~/application/errors/default-application-error';

export class UserExistsError extends DefaultApplicationError {
  statusCode = 409;
  name = 'UserExistsError';
}

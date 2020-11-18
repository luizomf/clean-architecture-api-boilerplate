import { DefaultApplicationError } from './default-application-error';

export class UserExistsError extends DefaultApplicationError {
  statusCode = 409;
  name = 'UserExistsError';
}

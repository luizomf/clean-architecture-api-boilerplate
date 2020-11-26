import { DefaultApplicationError } from '~/application/errors/default-application-error';

export class RepositoryError extends DefaultApplicationError {
  name = 'RepositoryError';
  statusCode = 500;
}

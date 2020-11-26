import { DefaultApplicationError } from '~/domain/ports/errors/default-application-error';

export class RepositoryError extends DefaultApplicationError {
  name = 'RepositoryError';
  statusCode = 500;
}

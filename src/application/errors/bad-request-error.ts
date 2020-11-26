import { DefaultApplicationError } from '~/application/errors/default-application-error';

export class BadRequestError extends DefaultApplicationError {
  name = 'BadRequestError';
  statusCode = 400;
}

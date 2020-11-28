import { RequestValidationError } from '~/application/errors/request-validation-error';
import { ValidationComposite } from '~/application/ports/validation/validation-composite';
import { CreateUserRequestWithPasswordString } from '~/domain/user/models/create-user-request-model';

export class UserEmptyRequiredFieldsValidation extends ValidationComposite<CreateUserRequestWithPasswordString> {
  async validate(
    request: CreateUserRequestWithPasswordString,
  ): Promise<void | never> {
    const error = new RequestValidationError('Invalid request');
    const { first_name, last_name, email, password, confirmPassword } = request;

    if (!first_name) error.messages.push('Missing field first_name');
    if (!last_name) error.messages.push('Missing field last_name');
    if (!email) error.messages.push('Missing field email');
    if (!password) error.messages.push('Missing field password');
    if (!confirmPassword) error.messages.push('Missing field confirmPassword');

    if (error.messages.length > 1) {
      throw error;
    }
  }
}

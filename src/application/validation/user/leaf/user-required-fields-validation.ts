import { RequestValidationError } from '~/application/errors/request-validation-error';
import { ValidationComposite } from '~/application/ports/validation/validation-composite';
import { isString } from '~/common/helpers/strings/is_string';
import { UserRequestWithPasswordString } from '~/domain/models/user/user-request-required-fields';

export class UserRequiredFieldsValidation extends ValidationComposite<UserRequestWithPasswordString> {
  async validate(
    request: UserRequestWithPasswordString,
  ): Promise<void> | never {
    const error = new RequestValidationError('Invalid request');
    const { first_name, last_name, email, password, confirmPassword } = request;

    if (!isString(first_name) || !first_name) {
      error.messages.push('Missing field first_name');
    }

    if (!isString(last_name) || !last_name) {
      error.messages.push('Missing field last_name');
    }

    if (!isString(email) || !email) {
      error.messages.push('Missing field email');
    }

    if (!isString(password) || !password) {
      error.messages.push('Missing field password');
    }

    if (!isString(confirmPassword) || !confirmPassword) {
      error.messages.push('Missing field confirmPassword');
    }

    if (error.messages.length > 1) {
      throw error;
    }
  }
}

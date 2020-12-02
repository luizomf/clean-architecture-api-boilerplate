import { RequestValidationError } from '~/application/errors/request-validation-error';
import { ValidationComposite } from '~/application/ports/validation/validation-composite';
import { UserRequestPartialFields } from '~/domain/models/user/user-request-partial-fields';

export class UserPartialRequiredFieldsValidation extends ValidationComposite<UserRequestPartialFields> {
  async validate(request: UserRequestPartialFields): Promise<void> | never {
    const error = new RequestValidationError('Invalid request');

    const { first_name, last_name, email, password, confirmPassword } = request;

    if (!this.isValidField(first_name)) {
      error.messages.push('Missing field first_name');
    }

    if (!this.isValidField(last_name)) {
      error.messages.push('Missing field last_name');
    }

    if (!this.isValidField(email)) {
      error.messages.push('Missing field email');
    }

    if (!this.isValidField(password)) {
      error.messages.push('Missing field password');
    }

    if (!this.isValidField(confirmPassword)) {
      error.messages.push('Missing field confirmPassword');
    }

    if (error.messages.length > 1) {
      throw error;
    }
  }

  private isValidField(field?: unknown): boolean {
    if (typeof field === 'undefined') {
      return true;
    }

    if (typeof field !== 'string') {
      return false;
    }

    if (field === '') {
      return false;
    }

    return true;
  }
}

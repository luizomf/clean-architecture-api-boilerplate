import { RequestValidationError } from '~/application/errors/request-validation-error';
import { UpdateUserRequestModel } from '~/application/ports/user/models/update-user-request-model';
import { ValidationComposite } from '~/application/ports/validators/validation-composite';

export class UserValidationPartialEmptyFields extends ValidationComposite {
  async validate(request: UpdateUserRequestModel): Promise<void | never> {
    if (!request.body) {
      throw new RequestValidationError('Missing body');
    }

    const {
      email,
      first_name,
      last_name,
      password,
      confirmPassword,
    } = request.body;

    if (this.invalidField(email)) {
      throw new RequestValidationError('Missing email');
    }

    if (this.invalidField(first_name)) {
      throw new RequestValidationError('Missing first_name');
    }

    if (this.invalidField(last_name)) {
      throw new RequestValidationError('Missing last_name');
    }

    if (this.invalidField(password)) {
      throw new RequestValidationError('Missing password');
    }

    if (this.invalidField(confirmPassword)) {
      throw new RequestValidationError('Missing confirmPassword');
    }

    if (!email && !first_name && !last_name && !password && !confirmPassword) {
      throw new RequestValidationError('Cannot proceed if body has no values');
    }
  }

  private invalidField(field: unknown) {
    if (typeof field !== undefined && field === '') {
      return true;
    }
    return false;
  }
}

import { RequestValidationError } from '~/application/errors/request-validation-error';
import { RequestModel } from '~/application/ports/request/request-model';
import { CreateUserRequestWithPasswordString } from '~/application/ports/user/create-user-request-model';
import { ValidationComposite } from '~/application/ports/validators/validation-composite';

export class UserValidationEmptyFields extends ValidationComposite {
  async validate(
    request: RequestModel<CreateUserRequestWithPasswordString>,
  ): Promise<void | never> {
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

    if (!email) {
      throw new RequestValidationError('Missing email');
    }

    if (!first_name) {
      throw new RequestValidationError('Missing first_name');
    }

    if (!last_name) {
      throw new RequestValidationError('Missing last_name');
    }

    if (!password) {
      throw new RequestValidationError('Missing password');
    }

    if (!confirmPassword) {
      throw new RequestValidationError('Missing confirmPassword');
    }
  }
}

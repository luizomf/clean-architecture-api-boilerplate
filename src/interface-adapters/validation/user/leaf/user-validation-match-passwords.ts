import { RequestValidationError } from '~/application/errors/request-validation-error';
import { RequestModel } from '~/application/ports/requests/request-model';
import { CreateUserRequestWithPasswordString } from '~/domain/user/models/create-user-request-model';
import { ValidationComposite } from '~/application/ports/validation/validation-composite';

export class UserValidationMatchPasswords extends ValidationComposite {
  async validate(
    request: RequestModel<CreateUserRequestWithPasswordString>,
  ): Promise<void | never> {
    if (!request.body) {
      throw new RequestValidationError('Missing body');
    }

    const { password, confirmPassword } = request.body;
    const emptyValues = !password || !confirmPassword;
    const valuesDoNotMatch = password !== confirmPassword;

    if (emptyValues) {
      throw new RequestValidationError('Password or confirmPassword is empty');
    }

    if (valuesDoNotMatch) {
      throw new RequestValidationError(
        'Password and confirmPassword must match',
      );
    }
  }
}

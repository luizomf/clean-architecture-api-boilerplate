import { InternalServerError } from '~/application/errors/internal-server-error';
import { ValidationComposite } from '~/application/ports/validation/validation-composite';
import { UserRequestWithPasswordString } from '~/domain/models/user/user-request-required-fields';

export class UserCompositeValidation extends ValidationComposite<UserRequestWithPasswordString> {
  async validate(
    request: UserRequestWithPasswordString,
  ): Promise<void> | never {
    if (this.validations.length === 0) {
      throw new InternalServerError('Composite has no validations');
    }

    for (const validation of this.validations) {
      await validation.validate(request);
    }
  }
}

import { InternalServerError } from '~/application/errors/internal-server-error';
import { ValidationComposite } from '~/application/ports/validation/validation-composite';
import { CreateUserRequestWithPasswordString } from '~/domain/user/models/create-user-request-model';

export class UserCompositeValidation extends ValidationComposite<CreateUserRequestWithPasswordString> {
  async validate(
    request: CreateUserRequestWithPasswordString,
  ): Promise<void | never> {
    if (this.validations.length === 0) {
      throw new InternalServerError('Composite has no validations');
    }

    for (const validation of this.validations) {
      await validation.validate(request);
    }
  }
}

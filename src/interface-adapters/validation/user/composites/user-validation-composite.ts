import { InternalServerError } from '~/application/errors/internal-server-error';
import { RequestModel } from '~/domain/ports/requests/request-model';
import { ValidationComposite } from '~/domain/ports/validation/validation-composite';

export class UserValidationComposite extends ValidationComposite {
  async validate(request: RequestModel): Promise<void | never> {
    if (this.validations.length <= 0) {
      throw new InternalServerError(
        'UserValidationComposite missing validations',
      );
    }

    for (const validation of this.validations) {
      await validation.validate(request);
    }
  }
}

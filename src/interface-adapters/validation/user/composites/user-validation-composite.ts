import { InternalServerError } from '~/application/errors/internal-server-error';
import { RequestModel } from '~/application/ports/requests/request-model';
import { ValidationComposite } from '~/application/ports/validators/validation-composite';

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

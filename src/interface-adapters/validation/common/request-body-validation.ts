import { RequestValidationError } from '~/application/errors/request-validation-error';
import { RequestModel } from '~/application/ports/requests/request-model';
import { ValidationComposite } from '~/application/ports/validators/validation-composite';

export class RequestBodyValidation extends ValidationComposite {
  async validate(request: RequestModel): Promise<void | never> {
    if (!request || !request.body) {
      throw new RequestValidationError('Missing body');
    }
  }
}

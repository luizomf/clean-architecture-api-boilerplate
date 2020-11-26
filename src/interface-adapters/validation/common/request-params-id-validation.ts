import { RequestValidationError } from '~/application/errors/request-validation-error';
import { RequestModel } from '~/application/ports/requests/request-model';
import { ValidationComposite } from '~/application/ports/validation/validation-composite';

export class RequestParamsIdValidation extends ValidationComposite {
  async validate(request: RequestModel): Promise<void | never> {
    if (!request.params || !request.params.id) {
      throw new RequestValidationError('Missing id');
    }
  }
}

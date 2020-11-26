import { RequestValidationError } from '~/application/errors/request-validation-error';
import { RequestModel } from '~/domain/ports/requests/request-model';
import { ValidationComposite } from '~/domain/ports/validation/validation-composite';

export class RequestParamsIdValidation extends ValidationComposite {
  async validate(request: RequestModel): Promise<void | never> {
    if (!request.params || !request.params.id) {
      throw new RequestValidationError('Missing id');
    }
  }
}

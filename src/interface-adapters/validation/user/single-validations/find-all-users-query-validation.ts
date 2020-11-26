/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestValidationError } from '~/application/errors/request-validation-error';
import { ValidationComposite } from '~/domain/ports/validation/validation-composite';

export class FindAllUsersQueryValidation extends ValidationComposite {
  async validate(request: any): Promise<void | never> {
    if (!request.query) {
      return;
    }

    const { order, limit, offset } = request.query;

    if (order) {
      if (order !== 'desc' && order !== 'asc') {
        throw new RequestValidationError('Wrong order: choose "desc" or "asc"');
      }
    }

    this.validatePositiveNumber(limit);
    this.validatePositiveNumber(offset);
  }

  private validatePositiveNumber(num: any) {
    if (!num) {
      return;
    }

    if (Number.isNaN(+num)) {
      throw new RequestValidationError('Limit and Offset must be numbers');
    }

    if (+num < 0) {
      throw new RequestValidationError(
        'Limit and Offset must be positive numbers',
      );
    }
  }
}

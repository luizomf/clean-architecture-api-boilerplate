import { RequestValidationError } from '~/application/errors/request-validation-error';
import { FindAllUsersRequestModel } from '~/domain/use-cases/user/find-all-users-use-case';
import { ValidationComposite } from '~/application/ports/validation/validation-composite';

export class FindAllUsersValidation extends ValidationComposite<FindAllUsersRequestModel> {
  async validate(request?: FindAllUsersRequestModel): Promise<void> | never {
    if (!request) {
      return;
    }

    if (request.order && !request.order.match(/desc|asc/i)) {
      throw new RequestValidationError('Order must be desc or asc');
    }

    this.validatePositiveNumberIfExists(request.limit);
    this.validatePositiveNumberIfExists(request.offset);
  }

  private validatePositiveNumberIfExists(
    value?: string | number,
  ): void | never {
    if (!value) {
      return;
    }

    if (!this.isAPositiveNumber(value)) {
      throw new RequestValidationError('Expected a positive number');
    }
  }

  private isAPositiveNumber(value: string | number): boolean {
    if (Number.isNaN(+value)) {
      return false;
    }

    if (+value < 0) {
      return false;
    }

    return true;
  }
}

import { RequestValidationError } from '~/application/errors/request-validation-error';
import { ValidationComposite } from '~/application/ports/validation/validation-composite';

export class ValidateStringNotEmpty extends ValidationComposite<string> {
  async validate(id: string): Promise<void> | never {
    if (typeof id !== 'string' || !id) {
      throw new RequestValidationError('Expected a string with a value');
    }
  }
}

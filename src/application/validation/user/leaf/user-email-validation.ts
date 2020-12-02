import { EmailValidationError } from '~/application/errors/email-validation-error';
import { EmailValidator } from '~/application/ports/validation/email-validator';
import { ValidationComposite } from '~/application/ports/validation/validation-composite';
import { UserRequestWithPasswordString } from '~/domain/models/user/user-request-required-fields';
import { UserRequestPartialFields } from '~/domain/models/user/user-request-partial-fields';

export class UserEmailValidation extends ValidationComposite<UserRequestWithPasswordString> {
  constructor(private readonly emailValidator: EmailValidator) {
    super();
  }

  async validate(request?: UserRequestPartialFields): Promise<void> | never {
    if (!request) {
      return;
    }

    const { email } = request;

    if (typeof email === 'undefined') {
      return;
    }

    if (!(await this.emailValidator.isValid(email))) {
      throw new EmailValidationError('Invalid e-mail');
    }
  }
}

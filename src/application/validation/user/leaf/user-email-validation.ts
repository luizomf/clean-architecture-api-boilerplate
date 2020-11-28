import { EmailValidationError } from '~/application/errors/email-validation-error';
import { EmailValidator } from '~/application/ports/validation/email-validator';
import { ValidationComposite } from '~/application/ports/validation/validation-composite';
import { CreateUserRequestWithPasswordString } from '~/domain/user/models/create-user-request-model';

export class UserEmailValidation extends ValidationComposite<CreateUserRequestWithPasswordString> {
  constructor(private readonly emailValidator: EmailValidator) {
    super();
  }

  async validate(
    request?: CreateUserRequestWithPasswordString,
  ): Promise<void | never> {
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

import { EmailValidationError } from '~/domain/email/errors/email-validation-error';
import { RequestValidationError } from '~/application/errors/request-validation-error';
import { RequestModel } from '~/domain/ports/requests/request-model';
import { CreateUserRequestWithPasswordString } from '~/domain/user/models/create-user-request-model';
import { EmailValidator } from '~/domain/email/validation/email-validator';
import { ValidationComposite } from '~/domain/ports/validation/validation-composite';

export class UserValidationEmail extends ValidationComposite {
  constructor(private readonly emailValidator: EmailValidator) {
    super();
  }

  async validate(
    request: RequestModel<CreateUserRequestWithPasswordString>,
  ): Promise<void | never> {
    if (!request.body) {
      throw new RequestValidationError('Missing body');
    }

    const { email } = request.body;
    const emailIsValid = await this.emailValidator.isValid(email);

    if (!emailIsValid) {
      throw new EmailValidationError('E-mail not valid');
    }
  }
}

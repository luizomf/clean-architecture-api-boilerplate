import { EmailValidationError } from '~/application/errors/email-validation-error';
import { RequestValidationError } from '~/application/errors/request-validation-error';
import { RequestModel } from '~/application/ports/request/request-model';
import { CreateUserRequestWithPasswordString } from '~/application/ports/user/create-user-request-model';
import { EmailValidator } from '~/application/ports/validators/email-validator';
import { ValidationComposite } from '~/application/ports/validators/validation-composite';

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

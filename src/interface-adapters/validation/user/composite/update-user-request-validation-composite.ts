import { RequestValidationError } from '~/application/errors/request-validation-error';
import { RequestModel } from '~/application/ports/requests/request-model';
import { EmailValidator } from '~/application/ports/validation/email-validator';
import { RequestBodyValidation } from '../../common/leaf/request-body-validation';
import { RequestParamsIdValidation } from '../../common/leaf/request-params-id-validation';
import { RequestParamsValidation } from '../../common/leaf/request-params-validation';
import { UserValidationEmail } from '../leaf/user-validation-email';
import { UserValidationMatchPasswords } from '../leaf/user-validation-match-passwords';
import { UserValidationPartialEmptyFields } from '../leaf/user-validation-partial-empty-fields';
import { UserValidationComposite } from './user-validation-composite';

export class UpdateUserRequestValidationComposite extends UserValidationComposite {
  constructor(private readonly emailValidator: EmailValidator) {
    super();
    this.add(new RequestParamsValidation());
    this.add(new RequestBodyValidation());
    this.add(new RequestParamsIdValidation());
    this.add(new UserValidationPartialEmptyFields());
  }

  async validate(request: RequestModel): Promise<void | never> {
    if (!request.body) {
      throw new RequestValidationError('Missing body');
    }

    const { email, password } = request.body;

    if (email) {
      this.add(new UserValidationEmail(this.emailValidator));
    }

    if (password) {
      this.add(new UserValidationMatchPasswords());
    }

    await super.validate(request);
  }
}

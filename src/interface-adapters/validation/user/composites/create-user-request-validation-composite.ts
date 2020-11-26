import { EmailValidator } from '~/domain/email/validation/email-validator';
import { RequestBodyValidation } from '../../common/request-body-validation';
import { UserValidationEmail } from '../single-validations/user-validation-email';
import { UserValidationEmptyFields } from '../single-validations/user-validation-empty-fields';
import { UserValidationMatchPasswords } from '../single-validations/user-validation-match-passwords';
import { UserValidationComposite } from './user-validation-composite';

export class CreateUserRequestValidationComposite extends UserValidationComposite {
  constructor(private readonly emailValidator: EmailValidator) {
    super();
    this.add(new RequestBodyValidation());
    this.add(new UserValidationEmptyFields());
    this.add(new UserValidationMatchPasswords());
    this.add(new UserValidationEmail(this.emailValidator));
  }
}

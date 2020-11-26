import { EmailValidator } from '~/application/ports/validation/email-validator';
import { RequestBodyValidation } from '../../common/leaf/request-body-validation';
import { UserValidationEmail } from '../leaf/user-validation-email';
import { UserValidationEmptyFields } from '../leaf/user-validation-empty-fields';
import { UserValidationMatchPasswords } from '../leaf/user-validation-match-passwords';
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

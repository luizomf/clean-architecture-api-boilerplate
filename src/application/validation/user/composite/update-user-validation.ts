import { EmailValidatorAdapter } from '~/common/adapters/validators/email-validator-adapter';
import { UserEmailValidation } from '../leaf/user-email-validation';
import { UserPartialRequiredFieldsValidation } from '../leaf/user-partial-required-fields-validation';
import { UserPasswordsMustMatchValidation } from '../leaf/user-passwords-must-match-validation';
import { UserCompositeValidation } from './user-composite-validation';

export class UpdateUserValidation extends UserCompositeValidation {
  constructor() {
    super();
    this.add(new UserPartialRequiredFieldsValidation());
    this.add(new UserPasswordsMustMatchValidation());
    this.add(new UserEmailValidation(new EmailValidatorAdapter()));
  }
}

import { ValidationComposite } from '~/application/ports/validation/validation-composite';
import { EmailValidatorAdapter } from '~/common/adapters/validators/email-validator-adapter';
import { SignInModel } from '~/domain/sign-in/models/sign-in-model';
import { UserEmailValidation } from '../../user/leaf/user-email-validation';
import { UserPartialRequiredFieldsValidation } from '../../user/leaf/user-partial-required-fields-validation';

export class SignInValidation extends ValidationComposite<SignInModel> {
  constructor() {
    super();
    this.add(new UserPartialRequiredFieldsValidation());
    this.add(new UserEmailValidation(new EmailValidatorAdapter()));
  }

  async validate(signInModel: SignInModel): Promise<void> | never {
    for (const validation of this.validations) {
      await validation.validate(signInModel);
    }
  }
}

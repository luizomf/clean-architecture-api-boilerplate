import { ValidationComposite } from '~/application/ports/validation/validation-composite';
import { EmailValidatorAdapter } from '~/common/adapters/validators/email-validator-adapter';
import { SignInRequestModel } from '~/domain/models/sign-in/sign-in-request-model';
import { UserEmailValidation } from '../../user/leaf/user-email-validation';
import { UserPartialRequiredFieldsValidation } from '../../user/leaf/user-partial-required-fields-validation';

export class SignInValidation extends ValidationComposite<SignInRequestModel> {
  constructor() {
    super();
    this.add(new UserPartialRequiredFieldsValidation());
    this.add(new UserEmailValidation(new EmailValidatorAdapter()));
  }

  async validate(signInModel: SignInRequestModel): Promise<void> | never {
    for (const validation of this.validations) {
      await validation.validate(signInModel);
    }
  }
}

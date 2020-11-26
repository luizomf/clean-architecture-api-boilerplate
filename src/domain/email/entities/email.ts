import { EmailValidator } from '../validation/email-validator';

export class Email {
  constructor(private readonly emailValidator: EmailValidator) {}
}

export interface EmailValidator {
  isValid(email: string): Promise<boolean>;
}

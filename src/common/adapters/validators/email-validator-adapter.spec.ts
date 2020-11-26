import { EmailValidatorAdapter } from './email-validator-adapter';

describe('EmailValidatorAdapter', () => {
  it('should return true for valid email', async () => {
    const sut = new EmailValidatorAdapter();
    const valid = await sut.isValid('email@email.com');
    expect(valid).toBe(true);
  });

  it('should return false for invalid email', async () => {
    const sut = new EmailValidatorAdapter();
    const valid = await sut.isValid('email.email.com');
    expect(valid).toBe(false);
  });
});

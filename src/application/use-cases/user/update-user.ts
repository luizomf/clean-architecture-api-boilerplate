import { EmailValidationError } from '~/application/errors/email-validation-error';
import { NotFoundError } from '~/application/errors/not-found-error';
import { RepositoryError } from '~/application/errors/repository-error';
import { FindUserByEmailRepository } from '~/application/ports/repositories/user/find-user-by-email-repository';
import { FindUserByIdRepository } from '~/application/ports/repositories/user/find-user-by-id-repository';
import { UpdateUserRepository } from '~/application/ports/repositories/user/update-user-repository';
import { PasswordHashing } from '~/application/ports/security/password-hashing';
import { UserRequestPartialFields } from '~/domain/models/user/user-request-partial-fields';
import { UpdateUserUseCase } from '~/domain/use-cases/user/update-user-use-case';
import { ValidationComposite } from '~/application/ports/validation/validation-composite';

export class UpdateUser implements UpdateUserUseCase {
  constructor(
    private readonly updateUserRepository: UpdateUserRepository,
    private readonly findUserByIdRepository: FindUserByIdRepository,
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    private readonly passwordHashing: PasswordHashing,
    private readonly validation: ValidationComposite<UserRequestPartialFields>,
  ) {}

  async update(
    id: string,
    request: UserRequestPartialFields,
  ): Promise<number> | never {
    await this.validation.validate(request);
    await this.checkUserExists(id);

    const newRequest = { ...request };
    const newPassword = newRequest.password;

    await this.checkEmailExists(newRequest.email);

    if (newPassword) {
      newRequest.password_hash = await this.passwordHashing.hash(newPassword);
    }

    delete newRequest.password;
    delete newRequest.confirmPassword;

    const updatedRows = await this.updateUserRepository.update(id, newRequest);

    if (updatedRows === 0 || !updatedRows) {
      throw new RepositoryError('Could not update user');
    }

    return updatedRows;
  }

  private async checkUserExists(id: string): Promise<void | never> {
    const foundUser = await this.findUserByIdRepository.findById(id);

    if (!foundUser) {
      throw new NotFoundError('User does not exist');
    }
  }

  private async checkEmailExists(newEmail?: string): Promise<void | never> {
    if (newEmail) {
      const foundEmail = await this.findUserByEmailRepository.findByEmail(
        newEmail,
      );

      if (foundEmail) {
        throw new EmailValidationError('E-mail already in use.');
      }
    }
  }
}

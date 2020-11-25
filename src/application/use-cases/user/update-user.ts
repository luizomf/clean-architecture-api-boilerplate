import { EmailValidationError } from '~/application/errors/email-validation-error';
import { NotFoundError } from '~/application/errors/not-found-error';
import { RepositoryError } from '~/application/errors/repository-error';
import { FindUserByEmailRepository } from '~/application/ports/repositories/find-user-by-email-repository';
import { FindUserByIdRepository } from '~/application/ports/repositories/find-user-by-id-repository';
import { UpdateUserRepository } from '~/application/ports/repositories/update-user-repository';
import { PasswordHashing } from '~/application/ports/security/password-hashing';
import { UpdateUserRequestModel } from '~/application/ports/user/models/update-user-request-model';
import { UpdateUserUseCase } from '~/application/ports/user/use-cases/update-user-use-case';
import { User } from '~/domain/user/user';

export class UpdateUser implements UpdateUserUseCase {
  constructor(
    private readonly updateUserRepository: UpdateUserRepository,
    private readonly findUserByIdRepository: FindUserByIdRepository,
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    private readonly passwordHashing: PasswordHashing,
  ) {}

  async update(
    id: string,
    request: UpdateUserRequestModel,
  ): Promise<User | never> {
    const foundUser = await this.findUserByIdRepository.findById(id);

    if (!foundUser) {
      throw new NotFoundError('User does not exist');
    }

    const newRequest = { ...request };

    const password = newRequest.password;
    const email = newRequest.email;

    if (email) {
      const foundEmail = await this.findUserByEmailRepository.findByEmail(
        email,
      );

      if (foundEmail) {
        throw new EmailValidationError('E-mail already in use.');
      }
    }

    delete newRequest.password;
    delete newRequest.confirmPassword;

    if (password) {
      const password_hash = await this.passwordHashing.hash(password);
      newRequest.password_hash = password_hash;
    }

    const updated = await this.updateUserRepository.update(id, newRequest);

    if (!updated) {
      throw new RepositoryError('Could not update user');
    }

    return { ...foundUser, ...newRequest };
  }
}

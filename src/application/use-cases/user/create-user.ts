import { UserExistsError } from '~/application/errors/user-exists-error';
import { CreateUserRepository } from '~/application/ports/repositories/user/create-user-repository';
import { FindUserByEmailRepository } from '~/application/ports/repositories/user/find-user-by-email-repository';
import { PasswordHashing } from '~/application/ports/security/password-hashing';
import { UserRequestWithPasswordString } from '~/domain/models/user/user-request-required-fields';
import { CreateUserUseCase } from '~/domain/use-cases/user/create-user-use-case';
import { User } from '~/domain/models/user/user';
import { ValidationComposite } from '~/application/ports/validation/validation-composite';

export class CreateUser implements CreateUserUseCase {
  constructor(
    private readonly createUserRepository: CreateUserRepository,
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    private readonly passwordHashing: PasswordHashing,
    private readonly validation: ValidationComposite<UserRequestWithPasswordString>,
  ) {}

  async create(userData: UserRequestWithPasswordString): Promise<User> {
    await this.validation.validate(userData);
    const userExists = await this.findUserByEmailRepository.findByEmail(
      userData.email,
    );

    if (userExists) {
      throw new UserExistsError('User already created');
    }

    const password_hash = await this.passwordHashing.hash(userData.password);
    const userWithPasswordHash = {
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      password_hash,
    };
    const user = await this.createUserRepository.create(userWithPasswordHash);
    return user;
  }
}

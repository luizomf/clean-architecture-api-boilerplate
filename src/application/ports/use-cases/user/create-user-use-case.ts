import { User } from '~/domain/user/entities/user';
import { UserRequestWithPasswordString } from '~/domain/user/models/user-request-required-fields';

export interface CreateUserUseCase {
  create(userData: UserRequestWithPasswordString): Promise<User> | never;
}

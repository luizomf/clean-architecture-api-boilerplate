import { User } from '~/domain/models/user/user';
import { UserRequestWithPasswordString } from '~/domain/models/user/user-request-required-fields';

export interface CreateUserUseCase {
  create(userData: UserRequestWithPasswordString): Promise<User> | never;
}

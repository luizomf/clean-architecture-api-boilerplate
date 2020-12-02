import { User } from '~/domain/models/user/user';
import { UserRequestWithPasswordHash } from '~/domain/models/user/user-request-required-fields';

export interface CreateUserRepository {
  create(requestModel: UserRequestWithPasswordHash): Promise<User | never>;
}

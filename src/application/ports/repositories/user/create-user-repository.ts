import { User } from '~/domain/user/entities/user';
import { UserRequestWithPasswordHash } from '~/domain/user/models/user-request-required-fields';

export interface CreateUserRepository {
  create(requestModel: UserRequestWithPasswordHash): Promise<User | never>;
}

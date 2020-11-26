import { User } from '~/domain/user/models/user';
import { CreateUserRequestWithPasswordHash } from '~/domain/user/models/create-user-request-model';

export interface CreateUserRepository {
  create(
    requestModel: CreateUserRequestWithPasswordHash,
  ): Promise<User | never>;
}

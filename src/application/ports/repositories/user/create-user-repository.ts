import { User } from '~/domain/user/user';
import { CreateUserRequestWithPasswordHash } from '../../user/models/create-user-request-model';

export interface CreateUserRepository {
  create(
    requestModel: CreateUserRequestWithPasswordHash,
  ): Promise<User | never>;
}

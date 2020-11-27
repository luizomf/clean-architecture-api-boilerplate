import { User } from '~/domain/user/entities/user';
import { CreateUserRequestWithPasswordString } from '~/domain/user/models/create-user-request-model';

export interface CreateUserUseCase {
  create(userData: CreateUserRequestWithPasswordString): Promise<User> | never;
}

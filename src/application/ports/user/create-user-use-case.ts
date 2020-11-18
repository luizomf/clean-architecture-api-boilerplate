import { User } from '~/domain/user/user';
import { CreateUserRequestWithPasswordString } from './create-user-request-model';

export interface CreateUserUseCase {
  create(userData: CreateUserRequestWithPasswordString): Promise<User>;
}

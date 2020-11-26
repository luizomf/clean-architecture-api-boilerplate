import { User } from '~/domain/user/models/user';
import { CreateUserRequestWithPasswordString } from '../models/create-user-request-model';

export interface CreateUserUseCase {
  create(userData: CreateUserRequestWithPasswordString): Promise<User>;
}

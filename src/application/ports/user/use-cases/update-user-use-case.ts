import { User } from '~/domain/user/user';
import { UpdateUserRequestModelBody } from '../models/update-user-request-model';

export interface UpdateUserUseCase {
  update(
    id: string,
    updateUserRequestModel: UpdateUserRequestModelBody,
  ): Promise<User | never>;
}

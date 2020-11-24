import { User } from '~/domain/user/user';
import { UpdateUserRequestModel } from '../models/update-user-request-model';

export interface UpdateUserUseCase {
  update(
    id: string,
    updateUserRequestModel: UpdateUserRequestModel,
  ): Promise<User | never>;
}

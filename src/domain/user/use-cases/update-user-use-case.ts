import { UserEntity } from '~/domain/user/entities/user';
import { UpdateUserRequestModelBody } from '../models/update-user-request-model';

export interface UpdateUserUseCase {
  update(
    id: string,
    updateUserRequestModel: UpdateUserRequestModelBody,
  ): Promise<UserEntity | never>;
}

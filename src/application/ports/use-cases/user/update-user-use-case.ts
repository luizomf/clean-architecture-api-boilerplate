import { UpdateUserRequestModelBody } from '~/domain/user/models/update-user-request-model';

export interface UpdateUserUseCase {
  update(
    id: string,
    updateUserRequestModel: UpdateUserRequestModelBody,
  ): Promise<number | never>;
}

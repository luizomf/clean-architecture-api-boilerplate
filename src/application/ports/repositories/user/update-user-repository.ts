import { UpdateUserRequestModelBody } from '~/domain/user/models/update-user-request-model';

export interface UpdateUserRepository {
  update(
    id: string,
    requestModel: UpdateUserRequestModelBody,
  ): Promise<number | never>;
}

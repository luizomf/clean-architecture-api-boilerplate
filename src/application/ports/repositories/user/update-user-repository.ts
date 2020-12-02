import { UserRequestPartialFields } from '~/domain/models/user/user-request-partial-fields';

export interface UpdateUserRepository {
  update(
    id: string,
    requestModel: UserRequestPartialFields,
  ): Promise<number | never>;
}

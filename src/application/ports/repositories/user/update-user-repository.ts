import { UserRequestPartialFields } from '~/domain/user/models/user-request-partial-fields';

export interface UpdateUserRepository {
  update(
    id: string,
    requestModel: UserRequestPartialFields,
  ): Promise<number | never>;
}

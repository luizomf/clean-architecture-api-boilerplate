import { UserRequestPartialFields } from '~/domain/user/models/user-request-partial-fields';

export interface UpdateUserUseCase {
  update(
    id: string,
    updateUserRequestModel: UserRequestPartialFields,
  ): Promise<number> | never;
}

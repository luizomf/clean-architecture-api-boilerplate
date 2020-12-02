import { UserRequestPartialFields } from '~/domain/models/user/user-request-partial-fields';

export interface UpdateUserUseCase {
  update(
    id: string,
    updateUserRequestModel: UserRequestPartialFields,
  ): Promise<number> | never;
}

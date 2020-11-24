import { User } from '~/domain/user/user';
import { UpdateUserRequestModel } from '../user/models/update-user-request-model';

export interface UpdateUserRepository {
  update(requestModel: UpdateUserRequestModel): Promise<User | never>;
}

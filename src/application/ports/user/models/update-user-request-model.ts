import { RequestModel } from '../../request/request-model';
import { CreateUserRequestWithPasswordString } from './create-user-request-model';

export type UpdateUserRequestModelBody = Partial<CreateUserRequestWithPasswordString>;
export type UpdateUserRequestModelParams = { id: string };
export type UpdateUserRequestModel = RequestModel<
  UpdateUserRequestModelBody,
  UpdateUserRequestModelParams
>;

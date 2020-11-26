import { CreateUserRequestWithPasswordString } from './create-user-request-model';

export type UpdateUserRequestModelBody = Partial<CreateUserRequestWithPasswordString>;
export type UpdateUserRequestModelParams = { id: string };

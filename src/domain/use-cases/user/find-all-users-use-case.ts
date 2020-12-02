import { User } from '~/domain/models/user/user';

export type FindAllUsersRequestModel = {
  order?: 'desc' | 'asc';
  limit?: number;
  offset?: number;
};

export interface FindAllUsersUseCase {
  findAll(requestModel?: FindAllUsersRequestModel): Promise<User[]>;
}

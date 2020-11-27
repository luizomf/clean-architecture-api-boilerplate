import { User } from '~/domain/user/entities/user';

export type FindAllUsersRequestModel = {
  order?: 'desc' | 'asc';
  limit?: number;
  offset?: number;
};

export interface FindAllUsersUseCase {
  findAll(requestModel?: FindAllUsersRequestModel): Promise<User[]>;
}

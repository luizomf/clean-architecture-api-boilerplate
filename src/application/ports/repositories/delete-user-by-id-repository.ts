import { User } from '~/domain/user/user';

export interface DeleteUserByIdRepository {
  deleteById(id: string): Promise<User | never>;
}

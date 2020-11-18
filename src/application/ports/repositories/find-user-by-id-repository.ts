import { User } from '~/domain/user/user';

export interface FindUserByIdRepository {
  findById(id: string): Promise<User | null>;
}

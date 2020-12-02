import { User } from '~/domain/models/user/user';

export interface FindUserByIdRepository {
  findById(id: string): Promise<User | null>;
}

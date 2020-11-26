import { User } from '~/domain/user/models/user';

export interface FindUserByIdRepository {
  findById(id: string): Promise<User | null>;
}

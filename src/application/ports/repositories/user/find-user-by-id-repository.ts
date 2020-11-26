import { User } from '~/domain/user/entities/user';

export interface FindUserByIdRepository {
  findById(id: string): Promise<User | null>;
}

import { User } from '~/domain/user/models/user';

export interface FindUserByEmailRepository {
  findByEmail(email: string): Promise<User | null>;
}

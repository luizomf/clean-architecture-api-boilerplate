import { User } from '~/domain/user/user';

export interface FindUserByEmailRepository {
  findByEmail(email: string): Promise<User | null>;
}

import { User } from '~/domain/user/entities/user';

export interface FindUserByEmailRepository {
  findByEmail(email: string): Promise<User | null>;
}

import { User } from '~/domain/user/user';

export interface FindAllUsersRepository {
  find(order: 'asc' | 'desc', limit: number, offset: number): Promise<User[]>;
}

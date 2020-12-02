import { User } from '~/domain/models/user/user';

export interface FindAllUsersRepository {
  find(order: 'asc' | 'desc', limit: number, offset: number): Promise<User[]>;
}

import { User } from '~/domain/models/user/user';

export interface FindOneUserWithRoles {
  findOneWithRoles(userId: string): Promise<User | null>;
}

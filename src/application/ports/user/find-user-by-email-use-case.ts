import { User } from '~/domain/user/user';

export interface FindUserByEmailUseCase {
  find(email: string): Promise<User | null>;
}

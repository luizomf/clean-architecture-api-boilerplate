import { User } from '~/domain/user/user';

export interface FindUserByEmailUseCase {
  findByEmail(email: string): Promise<User | null>;
}

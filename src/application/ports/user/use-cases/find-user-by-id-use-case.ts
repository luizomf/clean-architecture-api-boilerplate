import { User } from '~/domain/user/user';

export interface FindUserByIdUseCase {
  findById(id: string): Promise<User>;
}

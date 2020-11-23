import { User } from '~/domain/user/user';

export interface DeleteUserByIdUseCase {
  deleteById(id: string): Promise<User | never>;
}

import { User } from '~/domain/models/user/user';

export interface FindUserByIdUseCase {
  findById(id: string): Promise<User>;
}

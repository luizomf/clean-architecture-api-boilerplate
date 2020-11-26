import { User } from '~/domain/user/models/user';

export interface FindUserByIdUseCase {
  findById(id: string): Promise<User>;
}

import { UserEntity } from '~/domain/user/entities/user';

export interface FindUserByIdUseCase {
  findById(id: string): Promise<UserEntity>;
}

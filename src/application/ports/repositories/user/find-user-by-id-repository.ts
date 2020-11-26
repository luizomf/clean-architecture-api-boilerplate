import { UserEntity } from '~/domain/user/entities/user';

export interface FindUserByIdRepository {
  findById(id: string): Promise<UserEntity | null>;
}

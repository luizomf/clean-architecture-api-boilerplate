import { UserEntity } from '~/domain/user/entities/user';

export interface FindUserByEmailRepository {
  findByEmail(email: string): Promise<UserEntity | null>;
}

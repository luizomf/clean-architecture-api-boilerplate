import { User } from '~/domain/user/entities/user';

export interface FindAllUsersUseCase {
  findAll(
    order: 'asc' | 'desc',
    limit: number,
    offset: number,
  ): Promise<User[]>;
}

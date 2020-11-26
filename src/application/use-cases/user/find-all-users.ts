import { FindAllUsersRepository } from '~/application/ports/repositories/user/find-all-users-repository';
import { FindAllUsersUseCase } from '~/domain/user/use-cases/find-all-users-use-case';
import { UserEntity } from '~/domain/user/entities/user';

export class FindAllUsers implements FindAllUsersUseCase {
  constructor(
    private readonly findAllUsersRepository: FindAllUsersRepository,
  ) {}

  async findAll(
    order: 'desc' | 'asc' = 'desc',
    limit = 100,
    offset = 0,
  ): Promise<UserEntity[]> {
    const users = await this.findAllUsersRepository.find(order, limit, offset);
    return users;
  }
}

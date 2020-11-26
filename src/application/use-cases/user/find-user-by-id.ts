import { NotFoundError } from '~/application/errors/not-found-error';
import { FindUserByIdRepository } from '~/application/ports/repositories/user/find-user-by-id-repository';
import { FindUserByIdUseCase } from '~/domain/user/use-cases/find-user-by-id-use-case';
import { UserEntity } from '~/domain/user/entities/user';

export class FindUserById implements FindUserByIdUseCase {
  constructor(private readonly repository: FindUserByIdRepository) {}

  async findById(id: string): Promise<UserEntity> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }
}

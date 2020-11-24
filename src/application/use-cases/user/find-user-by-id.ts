import { NotFoundError } from '~/application/errors/not-found-error';
import { FindUserByIdRepository } from '~/application/ports/repositories/find-user-by-id-repository';
import { FindUserByIdUseCase } from '~/application/ports/user/use-cases/find-user-by-id-use-case';
import { User } from '~/domain/user/user';

export class FindUserById implements FindUserByIdUseCase {
  constructor(private readonly repository: FindUserByIdRepository) {}

  async findById(id: string): Promise<User> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }
}

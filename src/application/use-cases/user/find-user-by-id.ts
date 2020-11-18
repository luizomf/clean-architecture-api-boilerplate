import { NotFoundError } from '~/application/errors/not-found-error';
import { FindUserByIdRepository } from '~/application/ports/repositories/find-user-by-id-repository';
import { User } from '~/domain/user/user';

export class FindUserByIdUseCase implements FindUserByIdUseCase {
  constructor(private readonly repository: FindUserByIdRepository) {}

  async findById(id: string): Promise<User> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }
}

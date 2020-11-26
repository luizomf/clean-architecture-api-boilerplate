import { NotFoundError } from '~/application/errors/not-found-error';
import { DeleteUserByIdRepository } from '~/application/ports/repositories/user/delete-user-by-id-repository';
import { FindUserByIdRepository } from '~/application/ports/repositories/user/find-user-by-id-repository';
import { DeleteUserByIdUseCase } from '~/domain/user/use-cases/delete-user-by-id-use-case';

export class DeleteUserById implements DeleteUserByIdUseCase {
  constructor(
    private readonly deleteUserByIdRepository: DeleteUserByIdRepository,
    private readonly findUserByIdRepository: FindUserByIdRepository,
  ) {}

  async deleteById(id: string): Promise<number | never> {
    const user = await this.findUserByIdRepository.findById(id);

    if (!user) {
      throw new NotFoundError('User does not exist');
    }

    const deletedRows = await this.deleteUserByIdRepository.deleteById(id);
    return deletedRows;
  }
}

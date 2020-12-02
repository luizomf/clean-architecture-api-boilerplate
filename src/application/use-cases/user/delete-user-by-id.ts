import { NotFoundError } from '~/application/errors/not-found-error';
import { DeleteUserByIdRepository } from '~/application/ports/repositories/user/delete-user-by-id-repository';
import { FindUserByIdRepository } from '~/application/ports/repositories/user/find-user-by-id-repository';
import { DeleteUserByIdUseCase } from '~/domain/use-cases/user/delete-user-by-id-use-case';
import { ValidationComposite } from '~/application/ports/validation/validation-composite';

export class DeleteUserById implements DeleteUserByIdUseCase {
  constructor(
    private readonly deleteUserByIdRepository: DeleteUserByIdRepository,
    private readonly findUserByIdRepository: FindUserByIdRepository,
    private readonly validation: ValidationComposite,
  ) {}

  async deleteById(id: string): Promise<number> | never {
    await this.validation.validate(id);
    const user = await this.findUserByIdRepository.findById(id);

    if (!user) {
      throw new NotFoundError('User does not exist');
    }

    const deletedRows = await this.deleteUserByIdRepository.deleteById(id);
    return deletedRows;
  }
}

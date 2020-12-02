import { FindAllUsersRepository } from '~/application/ports/repositories/user/find-all-users-repository';
import {
  FindAllUsersRequestModel,
  FindAllUsersUseCase,
} from '~/domain/use-cases/user/find-all-users-use-case';
import { ValidationComposite } from '~/application/ports/validation/validation-composite';
import { User } from '~/domain/models/user/user';

export class FindAllUsers implements FindAllUsersUseCase {
  constructor(
    private readonly findAllUsersRepository: FindAllUsersRepository,
    private readonly validation: ValidationComposite<FindAllUsersRequestModel>,
  ) {}

  async findAll(request?: FindAllUsersRequestModel): Promise<User[]> | never {
    let order: 'desc' | 'asc' = 'desc';
    let limit = 100;
    let offset = 0;

    if (request) {
      if (request.order) order = request.order;
      if (request.limit) limit = request.limit;
      if (request.offset) offset = request.offset;
    }

    await this.validation.validate({ order, limit, offset });
    const users = await this.findAllUsersRepository.find(order, limit, offset);
    return users;
  }
}

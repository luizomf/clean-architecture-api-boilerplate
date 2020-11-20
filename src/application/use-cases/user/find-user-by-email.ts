import { FindUserByEmailRepository } from '~/application/ports/repositories/find-user-by-email-repository';
import { FindUserByEmailUseCase } from '~/application/ports/user/find-user-by-email-use-case';
import { User } from '~/domain/user/user';

export class FindUserByEmail implements FindUserByEmailUseCase {
  constructor(private readonly repository: FindUserByEmailRepository) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findByEmail(email);
  }
}

import { FindUserByEmailRepository } from '~/application/ports/repositories/find-user-by-email-repository';
import { User } from '~/domain/user/user';

export class FindUserByEmail implements FindUserByEmailRepository {
  constructor(private readonly repository: FindUserByEmailRepository) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findByEmail(email);
  }
}

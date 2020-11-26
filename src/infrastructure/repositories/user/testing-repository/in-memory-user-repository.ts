import { CreateUserRepository } from '~/application/ports/repositories/user/create-user-repository';
import { DeleteUserByIdRepository } from '~/application/ports/repositories/user/delete-user-by-id-repository';
import { FindAllUsersRepository } from '~/application/ports/repositories/user/find-all-users-repository';
import { FindUserByEmailRepository } from '~/application/ports/repositories/user/find-user-by-email-repository';
import { FindUserByIdRepository } from '~/application/ports/repositories/user/find-user-by-id-repository';
import { UpdateUserRepository } from '~/application/ports/repositories/user/update-user-repository';
import { CreateUserRequestWithPasswordHash } from '~/domain/user/models/create-user-request-model';
import { UpdateUserRequestModelBody } from '~/domain/user/models/update-user-request-model';
import { User } from '~/domain/user/models/user';

export type DBUserMap = Map<string, User>;

export class InMemoryUserRepository
  implements
    FindUserByIdRepository,
    FindUserByEmailRepository,
    CreateUserRepository,
    DeleteUserByIdRepository,
    UpdateUserRepository,
    FindAllUsersRepository {
  private users: DBUserMap = new Map();

  async find(
    order: 'asc' | 'desc' = 'asc',
    limit = 100,
    offset = 0,
  ): Promise<User[]> {
    if (order === 'asc') return this.toObject();
    return this.toObject()
      .reverse()
      .slice(offset, limit + offset);
  }

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.toObject().find((user) => user.email === email) || null;
  }

  async create(user: CreateUserRequestWithPasswordHash): Promise<User | never> {
    const id = this.createNewId();

    const newUser = { ...user, id };
    this.users.set(id, newUser);
    return newUser;
  }

  createMany(...users: CreateUserRequestWithPasswordHash[]): void {
    users.forEach((user) => this.create(user));
  }

  async deleteById(id: string): Promise<number | never> {
    const user = this.users.get(id);
    if (!user) return 0;
    this.users.delete(id);
    return 1;
  }

  async update(
    id: string,
    requestModel: UpdateUserRequestModelBody,
  ): Promise<number> {
    let user = await this.findById(id);

    if (!user) {
      return 0;
    }

    user = { ...user, ...requestModel };
    this.users.set(id, user);

    return 1;
  }

  clear(): void {
    this.users = new Map();
  }

  private createNewId(): string {
    const newId = this.users.size + 1;
    return newId.toString();
  }

  private toObject(): User[] {
    return [...this.users.values()];
  }
}

export const inMemoryUserRepositorySingleton = new InMemoryUserRepository();

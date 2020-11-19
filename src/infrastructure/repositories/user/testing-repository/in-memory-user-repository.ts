import { User } from '~/domain/user/user';
import { FindUserByIdRepository } from '~/application/ports/repositories/find-user-by-id-repository';
import { CreateUserRequestWithPasswordHash } from '~/application/ports/user/create-user-request-model';
import { FindUserByEmailRepository } from '~/application/ports/repositories/find-user-by-email-repository';
import { CreateUserRepository } from '~/application/ports/repositories/create-user-repository';

export type DBUserMap = Map<string, User>;

export class InMemoryUserRepository
  implements
    FindUserByIdRepository,
    FindUserByEmailRepository,
    CreateUserRepository {
  private users: DBUserMap = new Map();

  async find(order: 'asc' | 'desc' = 'asc'): Promise<Readonly<User[]>> {
    if (order === 'asc') return this.toObject();
    return this.toObject().reverse();
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

  async deleteById(id: string): Promise<User | null> {
    const user = this.users.get(id);
    if (!user) return null;
    this.users.delete(id);
    return user;
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

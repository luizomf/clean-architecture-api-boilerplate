import { RepositoryError } from '~/application/errors/repository-error';
import { CreateUserRepository } from '~/application/ports/repositories/user/create-user-repository';
import { DeleteUserByIdRepository } from '~/application/ports/repositories/user/delete-user-by-id-repository';
import { FindAllUsersRepository } from '~/application/ports/repositories/user/find-all-users-repository';
import { FindUserByEmailRepository } from '~/application/ports/repositories/user/find-user-by-email-repository';
import { FindUserByIdRepository } from '~/application/ports/repositories/user/find-user-by-id-repository';
import { UpdateUserRepository } from '~/application/ports/repositories/user/update-user-repository';
import { UserRequestWithPasswordHash } from '~/domain/models/user/user-request-required-fields';
import { UserRequestPartialFields } from '~/domain/models/user/user-request-partial-fields';
import { User } from '~/domain/models/user/user';
import { db } from '~/infrastructure/knex/connection';
import { FindOneUserWithRoles } from '~/application/ports/repositories/user/find-user-with-roles-repository';
import { mapUserFields } from '../helpers/map-user-fields';

export class UserSqlRepository
  implements
    FindUserByIdRepository,
    CreateUserRepository,
    FindUserByEmailRepository,
    DeleteUserByIdRepository,
    UpdateUserRepository,
    FindAllUsersRepository,
    FindOneUserWithRoles {
  private readonly table = 'users';

  async findById(id: string): Promise<User | null> {
    const user = await db<User>(this.table).where({ id }).first();
    if (!user) return null;
    return { ...user, id: user.id.toString() };
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await db<User>(this.table).where({ email }).first();
    if (!user) return null;
    return { ...user, id: user.id.toString() };
  }

  async create(
    requestModel: UserRequestWithPasswordHash,
  ): Promise<User | never> {
    try {
      const user = await db<User>(this.table)
        .insert(requestModel)
        .returning('id');
      return {
        id: user[0].toString(),
        email: requestModel.email,
        first_name: requestModel.first_name,
        last_name: requestModel.last_name,
        password_hash: requestModel.password_hash,
      };
    } catch (error) {
      const repositoryError = new RepositoryError('Could not create User');
      repositoryError.stack = error.stack;
      throw repositoryError;
    }
  }

  async deleteById(id: string): Promise<number> {
    const deleted = await db(this.table).delete().where({ id });
    return deleted;
  }

  async update(
    id: string,
    requestModel: UserRequestPartialFields,
  ): Promise<number | never> {
    try {
      const updated = await db(this.table).update(requestModel).where({ id });
      return updated;
    } catch (error) {
      const repositoryError = new RepositoryError('Could not create User');
      repositoryError.stack = error.stack;
      throw repositoryError;
    }
  }

  async find(
    order: 'asc' | 'desc',
    limit: number,
    offset: number,
  ): Promise<User[]> {
    const users = await db(this.table)
      .select('id', 'first_name', 'last_name', 'email', 'password_hash')
      .orderBy('id', order)
      .limit(limit)
      .offset(offset);
    return users;
  }

  async findOneWithRoles(id: string): Promise<User | null> {
    const user = await db(`${this.table} as u`)
      .select('u.*', 'r.id as role_id', 'r.name as role_name')
      .leftJoin('user_roles as ur', 'u.id', 'ur.user_id')
      .leftJoin('roles as r', 'r.id', 'ur.role_id')
      .where('u.id', '=', id);
    if (!user || !user.length) return null;
    return mapUserFields(user)[0];
  }
}

import { RepositoryError } from '~/application/errors/repository-error';
import { CreateUserRepository } from '~/application/ports/repositories/create-user-repository';
import { FindUserByEmailRepository } from '~/application/ports/repositories/find-user-by-email-repository';
import { FindUserByIdRepository } from '~/application/ports/repositories/find-user-by-id-repository';
import { CreateUserRequestWithPasswordHash } from '~/application/ports/user/create-user-request-model';
import { User } from '~/domain/user/user';
import { db } from '~/infrastructure/knex/connection';

export class UserSqlRepository
  implements
    FindUserByIdRepository,
    CreateUserRepository,
    FindUserByEmailRepository {
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
    requestModel: CreateUserRequestWithPasswordHash,
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
      console.log(error);
      const repositoryError = new RepositoryError('Could not create User');
      throw repositoryError;
    }
  }
}

// const user = new UserSqlRepository();
// user
//   .create({
//     first_name: 'first_name',
//     last_name: 'last_name',
//     email: 'email1@email.com',
//     password_hash: 'password_hash',
//   })
//   .then((r) => {
//     console.log(r);
//   })
//   .catch((e) => {
//     console.log(e);
//   })
//   .finally(() => {
//     db.destroy();
//   });

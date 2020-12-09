import { RepositoryError } from '~/application/errors/repository-error';
import { CreateTokenRepository } from '~/application/ports/repositories/token/create-token-repository';
import { DeleteTokenByUserIdRepository } from '~/application/ports/repositories/token/delete-token-by-user-id-repository';
import { FindTokenByTokenRepository } from '~/application/ports/repositories/token/find-token-by-token-repository';
import { FindTokenByIdRepository } from '~/application/ports/repositories/token/find-token-by-id-repository';
import { FindTokenByUserIdRepository } from '~/application/ports/repositories/token/find-token-by-user-id-repository';
import { formatDateTime } from '~/common/helpers/date/format-date-time';
import { Token } from '~/domain/models/token/token';
import { TokenRequestModel } from '~/domain/models/token/token-request-model';
import { db } from '~/infrastructure/knex/connection';

export class TokenSqlRepository
  implements
    FindTokenByTokenRepository,
    FindTokenByIdRepository,
    FindTokenByUserIdRepository,
    CreateTokenRepository,
    DeleteTokenByUserIdRepository {
  private readonly table = 'tokens';

  async findByToken(token: string): Promise<Token | null> {
    const foundToken = await db<Token>(this.table)
      .select('id', 'token', 'user_id', 'expires_in')
      .where({ token })
      .andWhere('expires_in', '>', formatDateTime(new Date()))
      .orderBy('id', 'desc')
      .first();

    if (!foundToken) return null;

    return {
      id: foundToken.id.toString(),
      token: foundToken.token,
      user_id: foundToken.user_id.toString(),
      expires_in: foundToken.expires_in,
    };
  }

  async findById(id: string): Promise<Token | null> {
    const foundToken = await db<Token>(this.table)
      .select('id', 'token', 'user_id', 'expires_in')
      .where({ id })
      .andWhere('expires_in', '>', formatDateTime(new Date()))
      .orderBy('id', 'desc')
      .first();

    if (!foundToken) return null;

    return {
      id: foundToken.id.toString(),
      token: foundToken.token,
      user_id: foundToken.user_id.toString(),
      expires_in: foundToken.expires_in,
    };
  }

  async findByUserId(user_id: string): Promise<Token | null> {
    const foundToken = await db<Token>(this.table)
      .select('id', 'token', 'user_id', 'expires_in')
      .where({ user_id })
      .andWhere('expires_in', '>', formatDateTime(new Date()))
      .orderBy('id', 'desc')
      .first();

    if (!foundToken) return null;

    return {
      id: foundToken.id.toString(),
      token: foundToken.token,
      user_id: foundToken.user_id.toString(),
      expires_in: foundToken.expires_in,
    };
  }

  async create(tokenModel: TokenRequestModel): Promise<Token> | never {
    if (!tokenModel || !tokenModel.user_id || !tokenModel.token) {
      throw new RepositoryError('Cannot create token without the values');
    }

    try {
      const token = await db.transaction(async (trx) => {
        await trx<Token>('tokens')
          .delete()
          .where({ user_id: tokenModel.user_id });
        const token = await trx<Token>(this.table)
          .insert(tokenModel)
          .returning('id');
        return token;
      });

      return {
        ...tokenModel,
        id: token[0].toString(),
      };

      // await this.deleteByUserId(tokenModel.user_id);
      // const token = await db<Token>(this.table)
      //   .insert(tokenModel)
      //   .returning('id');

      // return {
      //   ...tokenModel,
      //   id: token[0].toString(),
      // };
    } catch (error) {
      const repositoryError = new RepositoryError('Could not create token');
      repositoryError.stack = error.stack;
      throw repositoryError;
    }
  }

  async deleteByUserId(user_id: string): Promise<number> {
    const rows = await db(this.table).delete().where({ user_id });
    return rows;
  }
}

import { FindByTokenRepository } from '~/application/ports/repositories/token/find-by-token-repository';
import { TokenModel } from '~/domain/models/token/token-model';
import { db } from '~/infrastructure/knex/connection';

export class TokenSqlRepository implements FindByTokenRepository {
  private readonly table = 'tokens';

  async find(token: string): Promise<TokenModel | null> {
    const foundToken = await db<TokenModel>(this.table)
      .select('id', 'token', 'user_id', 'expires_in')
      .where({ token })
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
}

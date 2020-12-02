import { formatDateTime } from '~/common/helpers/format-date-time';
import { TokenModel } from '~/domain/models/token/token-model';
import { User } from '~/domain/models/user/user';
import { db } from '~/infrastructure/knex/connection';
import { TokenSqlRepository } from './token-sql-repository';

const sutFactory = () => {
  const sut = new TokenSqlRepository();

  return {
    sut,
  };
};

describe('TokenRepository', () => {
  beforeAll(async () => {
    await db.migrate.latest({ directory: process.env.MIGRATIONS });
    await db<User>('users').insert([
      {
        first_name: 'first_name',
        last_name: 'last_name',
        email: 'email@email.com',
        password_hash: 'any_hash',
      },
      {
        first_name: 'first_name',
        last_name: 'last_name',
        email: 'email1@email.com',
        password_hash: 'any_hash',
      },
    ]);
    await db<TokenModel>('tokens').insert([
      {
        token: 'token_1',
        user_id: '1',
        expires_in: formatDateTime(new Date(new Date().getTime() + 86400000)),
      },
      {
        token: 'token_2',
        user_id: '2',
        expires_in: formatDateTime(new Date(new Date().getTime() + 86400000)),
      },
    ]);
  });

  afterAll(async () => {
    await db.destroy();
  });

  it('should find a user by token', async () => {
    const { sut } = sutFactory();
    const tokenData = (await sut.find('token_1')) as TokenModel;
    expect(tokenData.id).toBe('1');
    expect(tokenData.token).toBe('token_1');
    expect(tokenData.user_id).toBe('1');
    expect(tokenData.expires_in).toBeTruthy();
  });

  it('should return null if token is not found', async () => {
    const { sut } = sutFactory();
    const tokenData = (await sut.find('token_abc')) as TokenModel;
    expect(tokenData).toBeNull();
  });
});

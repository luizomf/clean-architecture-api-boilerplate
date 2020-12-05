/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDateTime } from '~/common/helpers/date/format-date-time';
import { Token } from '~/domain/models/token/token';
import { User } from '~/domain/models/user/user';
import { db } from '~/infrastructure/knex/connection';
import { TokenSqlRepository } from './token-sql-repository';

const sutFactory = () => {
  const sut = new TokenSqlRepository();

  return {
    sut,
  };
};

const dateFactory = (future = true) => {
  const additionalDay = future ? +86400000 : -86400000;
  const date = new Date(new Date().getTime() + additionalDay);
  return formatDateTime(date);
};

describe('TokenRepository', () => {
  beforeAll(async () => {
    await db.migrate.latest({ directory: process.env.MIGRATIONS });
    await db<User>('users').insert([
      {
        id: '10',
        first_name: 'first_name',
        last_name: 'last_name',
        email: 'email@email.com',
        password_hash: 'any_hash',
      },
      {
        id: '100',
        first_name: 'first_name',
        last_name: 'last_name',
        email: 'email1@email.com',
        password_hash: 'any_hash',
      },
      {
        id: '300',
        first_name: 'first_name',
        last_name: 'last_name',
        email: 'email2@email.com',
        password_hash: 'any_hash',
      },
    ]);
    await db<Token>('tokens').insert([
      {
        token: 'token_1',
        user_id: '10',
        expires_in: dateFactory(), // +1 day
      },
      {
        token: 'token_2',
        user_id: '100',
        expires_in: dateFactory(), // +1 day
      },
      {
        token: 'expired_token',
        user_id: '300',
        expires_in: dateFactory(false), // -1 day
      },
    ]);
  });

  afterAll(async () => {
    await db.destroy();
  });

  it('should find by token', async () => {
    const { sut } = sutFactory();
    const tokenData = (await sut.findByToken('token_1')) as Token;
    expect(tokenData.id).toBe('1');
    expect(tokenData.token).toBe('token_1');
    expect(tokenData.user_id).toBe('10');
    expect(tokenData.expires_in).toBeTruthy();
  });

  it('should return null if token is not found', async () => {
    const { sut } = sutFactory();
    const tokenData = (await sut.findByToken('token_abc')) as Token;
    expect(tokenData).toBeNull();
  });

  it('should return null if token is expired', async () => {
    const { sut } = sutFactory();
    const tokenData = (await sut.findByToken('expired_token')) as Token;
    expect(tokenData).toBeNull();
  });

  it('should find by id', async () => {
    const { sut } = sutFactory();
    const tokenData = (await sut.findById('1')) as Token;
    expect(tokenData.id).toBe('1');
    expect(tokenData.token).toBe('token_1');
    expect(tokenData.user_id).toBe('10');
    expect(tokenData.expires_in).toBeTruthy();
  });

  it('should return null if token is not found', async () => {
    const { sut } = sutFactory();
    const tokenData = (await sut.findById('1000')) as Token;
    expect(tokenData).toBeNull();
  });

  it('should return null if token is expired', async () => {
    const { sut } = sutFactory();
    const tokenData = (await sut.findById('3')) as Token;
    expect(tokenData).toBeNull();
  });

  it('should find by user id', async () => {
    const { sut } = sutFactory();
    const tokenData = (await sut.findByUserId('10')) as Token;
    expect(tokenData.id).toBe('1');
    expect(tokenData.token).toBe('token_1');
    expect(tokenData.user_id).toBe('10');
    expect(tokenData.expires_in).toBeTruthy();
  });

  it('should return null if token is not found', async () => {
    const { sut } = sutFactory();
    const tokenData = (await sut.findByUserId('1000')) as Token;
    expect(tokenData).toBeNull();
  });

  it('should return null if token is expired', async () => {
    const { sut } = sutFactory();
    const tokenData = (await sut.findByUserId('3')) as Token;
    expect(tokenData).toBeNull();
  });

  it('should create a token', async () => {
    const { sut } = sutFactory();

    const tokenData = await sut.create({
      token: 'new_token',
      expires_in: dateFactory(),
      user_id: '100',
    });

    expect(tokenData.id).toBeTruthy();
    expect(tokenData.token).toBe('new_token');
    expect(tokenData.user_id).toBe('100');
    expect(tokenData.expires_in).toBeTruthy();
  });

  it('should delete a token by user_id', async () => {
    const { sut } = sutFactory();

    await sut.create({
      token: 'new_token',
      expires_in: dateFactory(),
      user_id: '100',
    });
    await sut.deleteByUserId('100');
    const tokenData = (await sut.findByUserId('100')) as Token;

    expect(tokenData).toBeNull();
  });

  it('should throw if no data is provided', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.create({} as any);
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RepositoryError');
    expect(error.message).toBe('Cannot create token without the values');
  });

  it('should throw if repository throws', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.create({
        id: 'abc',
        token: 132,
        expires_in: 'abc',
        user_id: 'abc',
      } as any);
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RepositoryError');
    expect(error.message).toBe('Could not create token');
  });
});

/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '~/domain/user/user';
import { db } from '~/infrastructure/knex/connection';
import { UserSqlRepository } from './user-sql-repository';

const sutFactory = () => {
  const sut = new UserSqlRepository();

  return {
    sut,
  };
};

describe('UserSqlRepository', () => {
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
  });

  afterAll(async () => {
    await db.destroy();
  });

  it('should find a user by id', async () => {
    const { sut } = sutFactory();
    const user = (await sut.findById('1')) as User;
    expect(user.id).toBeTruthy();
    expect(user.first_name).toBe('first_name');
    expect(user.last_name).toBe('last_name');
    expect(user.email).toBe('email@email.com');
    expect(user.password_hash).toBe('any_hash');
  });

  it('should return null if no user is found', async () => {
    const { sut } = sutFactory();
    const user = await sut.findById('abc');
    expect(user).toBeNull();
  });

  it('should find a user by email', async () => {
    const { sut } = sutFactory();
    const user = (await sut.findByEmail('email@email.com')) as User;
    expect(user.id).toBeTruthy();
    expect(user.first_name).toBe('first_name');
    expect(user.last_name).toBe('last_name');
    expect(user.email).toBe('email@email.com');
    expect(user.password_hash).toBe('any_hash');
  });

  it('should return null if no user is found', async () => {
    const { sut } = sutFactory();
    const user = await sut.findByEmail('abc');
    expect(user).toBeNull();
  });

  it('should create a new user if data is correct', async () => {
    const { sut } = sutFactory();
    const createdUser = await sut.create({
      first_name: 'another_first_name',
      last_name: 'another_last_name',
      email: 'another@email.com',
      password_hash: 'another_hash',
    });
    expect(createdUser.id).toBeTruthy();
    expect(createdUser.first_name).toBe('another_first_name');
    expect(createdUser.last_name).toBe('another_last_name');
    expect(createdUser.email).toBe('another@email.com');
    expect(createdUser.password_hash).toBe('another_hash');
  });

  it('should throw if data is incorrect', async () => {
    const { sut } = sutFactory();

    let error;
    try {
      await sut.create({
        last_name: 'another_last_name',
        email: 'another@email.com',
        password_hash: 'another_hash',
      } as any);
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RepositoryError');
    expect(error.message).toBe('Could not create User');
    expect(error.statusCode).toBe(500);
  });

  it('should delete a user if exists', async () => {
    const { sut } = sutFactory();
    const deleted = await sut.deleteById('2');
    expect(deleted).toBe(1);
  });

  it('should return zero (0) if user do not exist', async () => {
    const { sut } = sutFactory();
    const deleted = await sut.deleteById('abc');
    expect(deleted).toBe(0);
  });

  it('should update a user if data is correct', async () => {
    const { sut } = sutFactory();
    const updated = await sut.update('1', {
      first_name: 'another_first_name',
      last_name: 'another_last_name',
      email: 'another_updated@email.com',
      password_hash: 'another_hash',
    });
    expect(updated).toBe(1);
  });

  it('should return zero (0) if update user do not exist', async () => {
    const { sut } = sutFactory();
    const updated = await sut.update('abc', {
      first_name: 'another_first_name',
      last_name: 'another_last_name',
      email: 'another_updated@email.com',
      password_hash: 'another_hash',
    });
    expect(updated).toBe(0);
  });

  it('should throw if user data is empty when updating', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.update('abc', {});
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('RepositoryError');
    expect(error.statusCode).toBe(500);
  });

  it('should find all users', async () => {
    const { sut } = sutFactory();
    const users = await sut.find('desc', 100, 0);
    expect(users.length).toBeGreaterThan(0);
  });
});

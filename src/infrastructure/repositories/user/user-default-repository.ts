/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserSqlRepository } from './sql/user-sql-repository';
import { inMemoryUserRepositoryFactory } from './testing-repository/in-memory-user-repository-factory';

// This is just for changing repositories easily while developing
const userSqlRepository = new UserSqlRepository();
const inMemoryUserRepository = inMemoryUserRepositoryFactory();

const createUserRepository = userSqlRepository;
const findUserByIdRepository = userSqlRepository;
const findUserByEmailRepository = userSqlRepository;

export {
  createUserRepository,
  findUserByIdRepository,
  findUserByEmailRepository,
};

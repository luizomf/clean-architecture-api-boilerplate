/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreateUserRepository } from '~/application/ports/repositories/create-user-repository';
import { FindUserByEmailRepository } from '~/application/ports/repositories/find-user-by-email-repository';
import { FindUserByIdRepository } from '~/application/ports/repositories/find-user-by-id-repository';
import { UserSqlRepository } from './sql/user-sql-repository';
import { inMemoryUserRepositoryFactory } from './testing-repository/in-memory-user-repository-factory';

// This is just for changing repositories easily while developing
const userSqlRepository = new UserSqlRepository();
const inMemoryUserRepository = inMemoryUserRepositoryFactory();

const createUserRepository: CreateUserRepository = userSqlRepository;
const findUserByIdRepository: FindUserByIdRepository = userSqlRepository;
const findUserByEmailRepository: FindUserByEmailRepository = userSqlRepository;

export {
  createUserRepository,
  findUserByIdRepository,
  findUserByEmailRepository,
};

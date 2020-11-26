/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreateUserRepository } from '~/application/ports/repositories/create-user-repository';
import { DeleteUserByIdRepository } from '~/application/ports/repositories/delete-user-by-id-repository';
import { FindAllUsersRepository } from '~/application/ports/repositories/find-all-users-repository';
import { FindUserByEmailRepository } from '~/application/ports/repositories/find-user-by-email-repository';
import { FindUserByIdRepository } from '~/application/ports/repositories/find-user-by-id-repository';
import { UpdateUserRepository } from '~/application/ports/repositories/update-user-repository';
import { UserSqlRepository } from './sql/user-sql-repository';
import { inMemoryUserRepositoryFactory } from './testing-repository/in-memory-user-repository-factory';

// This is just for changing repositories easily while developing
const userSqlRepository = new UserSqlRepository();
const inMemoryUserRepository = inMemoryUserRepositoryFactory();

const createUserRepository: CreateUserRepository = userSqlRepository;
const findUserByIdRepository: FindUserByIdRepository = userSqlRepository;
const findUserByEmailRepository: FindUserByEmailRepository = userSqlRepository;
const deleteUserByIdRepository: DeleteUserByIdRepository = userSqlRepository;
const updateUserRepository: UpdateUserRepository = userSqlRepository;
const findAllUsersRepository: FindAllUsersRepository = userSqlRepository;

export {
  createUserRepository,
  findUserByIdRepository,
  findUserByEmailRepository,
  deleteUserByIdRepository,
  updateUserRepository,
  findAllUsersRepository,
};

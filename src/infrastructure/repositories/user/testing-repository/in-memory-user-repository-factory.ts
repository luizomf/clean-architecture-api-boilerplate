import {
  InMemoryUserRepository,
  inMemoryUserRepositorySingleton,
} from './in-memory-user-repository';

export const inMemoryUserRepositoryFactory = (): InMemoryUserRepository => {
  /* istanbul ignore else */
  if (process.env.NODE_ENV === 'test') {
    return new InMemoryUserRepository();
  }
  // This won't ever happen when NODE_ENV is test
  // so it won't show as untested on test coverage
  /* istanbul ignore next */
  return inMemoryUserRepositorySingleton;
};

import { inMemoryUserRepositoryFactory } from './in-memory-user-repository-factory';

describe('inMemoryUserRepositoryFactory', () => {
  it('should create a new instance in test environment', async () => {
    const sut = inMemoryUserRepositoryFactory();
    const anotherInstance = inMemoryUserRepositoryFactory();
    expect(sut).not.toBe(anotherInstance);
  });
});

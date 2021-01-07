/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserSqlRepository } from '~/infrastructure/repositories/user/sql/repositories/user-sql-repository';
import { LoggedUserIsTargetUserMiddleware } from './logged-user-is-target-user';

jest.mock(
  '~/infrastructure/repositories/user/sql/repositories/user-sql-repository',
);
const UserSqlRepositoryMock = UserSqlRepository as jest.Mock<UserSqlRepository>;

const sutFactory = () => {
  const findWithRolesRepositoryMock = new UserSqlRepositoryMock() as jest.Mocked<UserSqlRepository>;
  findWithRolesRepositoryMock.findOneWithRoles.mockResolvedValue({
    id: 'any_id',
  } as any);
  const sut = new LoggedUserIsTargetUserMiddleware(findWithRolesRepositoryMock);

  return {
    sut,
    findWithRolesRepositoryMock,
  };
};

describe('LoggedUserIsTargetUserMiddleware', () => {
  it('should throw if request headers is invalid', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.handleRequest({});
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('UnauthorizedError');
    expect(error.message).toBe('Not allowed');
  });

  it('should throw if request params is invalid', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.handleRequest({ headers: { userId: 'any' } });
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('UnauthorizedError');
    expect(error.message).toBe('Not allowed');
  });

  it('should throw if params.id is not logged user id and logged user is not admin', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.handleRequest({
        headers: { userId: 'any' },
        params: { id: 'different' },
      });
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('UnauthorizedError');
  });

  it('should allow admin users', async () => {
    const { sut, findWithRolesRepositoryMock } = sutFactory();
    findWithRolesRepositoryMock.findOneWithRoles.mockResolvedValueOnce({
      roles: [{ id: '1', name: 'admin' }],
    } as any);
    const noValue = await sut.handleRequest({
      headers: { userId: 'any' },
      params: { id: 'different' },
    });

    expect(noValue).toBeUndefined();
  });

  it('should NOT allow non admin users', async () => {
    const { sut, findWithRolesRepositoryMock } = sutFactory();
    findWithRolesRepositoryMock.findOneWithRoles.mockResolvedValueOnce({
      roles: [{ id: '1', name: 'any' }],
    } as any);

    let error;

    try {
      await sut.handleRequest({
        headers: { userId: 'any' },
        params: { id: 'different' },
      });
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('UnauthorizedError');
    expect(error.message).toBe('You are not allowed to manipulate target user');
  });

  it('should allow if params.id is the same as logged user id', async () => {
    const { sut } = sutFactory();
    const noValue = await sut.handleRequest({
      headers: { userId: 'any_id' },
      params: { id: 'any_id' },
    });
    expect(noValue).toBeUndefined();
  });
});

/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '~/domain/models/user/user';
import { UserWithRoles } from '../models/user-with-roles';
import { mapUserFields } from './map-user-fields';

const sutFactory = () => {
  const sut = mapUserFields;

  return {
    sut,
  };
};

describe('mapUserFields', () => {
  it('should map role rows to a single user', async () => {
    const { sut } = sutFactory();
    const userWithRoles: UserWithRoles[] = [
      {
        id: '1',
        first_name: 'first',
        last_name: 'last',
        email: 'email@email.com',
        role_id: '1',
        role_name: 'any_role1',
        role_description: 'any_description1',
      },
      {
        id: '1',
        first_name: 'first',
        last_name: 'last',
        email: 'email@email.com',
        role_id: '2',
        role_name: 'any_role2',
        role_description: 'any_description1',
      },
      {
        id: '2',
        first_name: 'first',
        last_name: 'last',
        email: 'email@email.com',
        role_id: '2',
        role_name: 'any_role2',
        role_description: 'any_description1',
      },
      {
        id: '3',
        first_name: 'first',
        last_name: 'last',
        email: 'email@email.com',
        role_id: null,
        role_name: null,
        role_description: 'any_description1',
      },
    ] as any;

    const userMap = sut(userWithRoles) as Required<User[]>;

    expect(userMap[0].roles).toEqual([
      { id: '1', name: 'any_role1' },
      { id: '2', name: 'any_role2' },
    ]);
    expect(userMap[1].roles).toEqual([{ id: '2', name: 'any_role2' }]);
  });
});

import { User } from '~/domain/models/user/user';
import { UserWithRoles } from '../models/user-with-roles';

const fixRole = (role: unknown) => {
  if (typeof role === 'number') return role.toString();
  if (typeof role === 'string') return role;
  return '';
};

export const mapUserFields = (users: UserWithRoles[]): User[] => {
  const newUsersMap = new Map<string, User>();

  for (const user of users) {
    const { id, first_name, last_name, email, password_hash } = user;
    const role_id = fixRole(user.role_id);
    const role_name = fixRole(user.role_name);

    if (!newUsersMap.get(user.id)) {
      newUsersMap.set(user.id, {
        id,
        first_name,
        last_name,
        email,
        password_hash,
        roles: [{ id: role_id, name: role_name }],
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      newUsersMap.get(user.id)!.roles!.push({ id: role_id, name: role_name });
    }
  }

  return [...newUsersMap.values()];
};

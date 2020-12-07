import { User } from '~/domain/models/user/user';
import { UserWithRoles } from '../models/user-with-roles';

export const mapUserFields = (users: UserWithRoles[]): User[] => {
  const newUsersMap = new Map<string, User>();

  for (const user of users) {
    const {
      id,
      first_name,
      last_name,
      email,
      password_hash,
      role_id,
      role_name,
    } = user;

    if (!newUsersMap.get(user.id)) {
      newUsersMap.set(user.id, {
        id,
        first_name,
        last_name,
        email,
        password_hash,
        roles: [{ id: role_id.toString(), name: role_name }],
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      newUsersMap
        .get(user.id)!
        .roles!.push({ id: role_id.toString(), name: role_name });
    }
  }

  return [...newUsersMap.values()];
};

import { User } from '~/domain/models/user/user';
export type UserWithRoles = User & {
  role_id: string;
  role_name: string;
  role_description: string;
};

import { Role } from '../role/role';

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  password_hash?: string;
  roles?: Role[];
}

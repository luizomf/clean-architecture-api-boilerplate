export interface UserEntity {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  password_hash?: string;
}

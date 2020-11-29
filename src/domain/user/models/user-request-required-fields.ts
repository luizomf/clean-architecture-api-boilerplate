import { User } from '~/domain/user/entities/user';

type PasswordAndConfirmPasswordString = {
  password: string;
  confirmPassword: string;
};

type PasswordHash = {
  password_hash: string;
};

export type UserRequestWithPasswordString = Omit<User, 'id'> &
  PasswordAndConfirmPasswordString;
export type UserRequestWithPasswordHash = Omit<User, 'id'> & PasswordHash;

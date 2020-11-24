import { User } from '~/domain/user/user';

type PasswordAndConfirmPasswordString = {
  password: string;
  confirmPassword: string;
};

type PasswordHash = {
  password_hash: string;
};

export type CreateUserRequestWithPasswordString = Omit<User, 'id'> &
  PasswordAndConfirmPasswordString;
export type CreateUserRequestWithPasswordHash = Omit<User, 'id'> & PasswordHash;

import { User } from '~/domain/user/models/user';

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

import { UserEntity } from '~/domain/user/entities/user';

type PasswordAndConfirmPasswordString = {
  password: string;
  confirmPassword: string;
};

type PasswordHash = {
  password_hash: string;
};

export type CreateUserRequestWithPasswordString = Omit<UserEntity, 'id'> &
  PasswordAndConfirmPasswordString;
export type CreateUserRequestWithPasswordHash = Omit<UserEntity, 'id'> &
  PasswordHash;

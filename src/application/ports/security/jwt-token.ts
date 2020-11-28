export interface JwtToken {
  sign(userId: string): string;
  verify(jwtToken: string): string;
}

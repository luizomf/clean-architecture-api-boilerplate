export interface JwtToken {
  signAccessToken(userId: string): string;
  signRefreshToken(userId: string): string;
  verify(jwtToken: string): string;
}

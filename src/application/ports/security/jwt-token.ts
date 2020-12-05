type TokenReturnValue = { token: string; expirationDate: Date };

export interface JwtToken {
  signAccessToken(userId: string): TokenReturnValue;
  signRefreshToken(userId: string): TokenReturnValue;
  verify(jwtToken: string): string;
}

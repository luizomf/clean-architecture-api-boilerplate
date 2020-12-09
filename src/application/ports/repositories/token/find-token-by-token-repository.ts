import { Token } from '~/domain/models/token/token';

export interface FindTokenByTokenRepository {
  findByToken(token: string): Promise<Token | null>;
}

import { Token } from '~/domain/models/token/token';

export interface FindByTokenRepository {
  findByToken(token: string): Promise<Token | null>;
}

import { TokenModel } from '~/domain/models/token/token-model';

export interface FindByTokenRepository {
  find(token: string): Promise<TokenModel | null>;
}

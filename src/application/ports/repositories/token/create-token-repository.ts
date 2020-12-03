import { Token } from '~/domain/models/token/token';
import { TokenRequestModel } from '~/domain/models/token/token-request-model';

export interface CreateTokenRepository {
  create(tokenModel: TokenRequestModel): Promise<Token> | never;
}

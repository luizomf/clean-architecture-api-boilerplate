import { Token } from '~/domain/models/token/token';

export interface FindTokenByUserIdRepository {
  findByUserId(userId: string): Promise<Token | null>;
}

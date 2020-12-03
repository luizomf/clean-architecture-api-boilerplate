import { Token } from '~/domain/models/token/token';

export interface FindTokenByIdRepository {
  findById(id: string): Promise<Token | null>;
}

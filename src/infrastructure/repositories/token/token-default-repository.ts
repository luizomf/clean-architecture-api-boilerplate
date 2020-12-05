import { CreateTokenRepository } from '~/application/ports/repositories/token/create-token-repository';
import { TokenSqlRepository } from './sql/token-sql-repository';

const tokenDefaultRepository = new TokenSqlRepository();

const createTokenRepository: CreateTokenRepository = tokenDefaultRepository;

export { createTokenRepository };

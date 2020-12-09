import { CreateTokenRepository } from '~/application/ports/repositories/token/create-token-repository';
import { FindTokenByTokenRepository } from '~/application/ports/repositories/token/find-token-by-token-repository';
import { TokenSqlRepository } from './sql/token-sql-repository';

const tokenDefaultRepository = new TokenSqlRepository();

const createTokenRepository: CreateTokenRepository = tokenDefaultRepository;
const findByTokenRepository: FindTokenByTokenRepository = tokenDefaultRepository;

export { createTokenRepository, findByTokenRepository };

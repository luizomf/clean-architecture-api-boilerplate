import { CreateTokenRepository } from '~/application/ports/repositories/token/create-token-repository';
import { FindByTokenRepository } from '~/application/ports/repositories/token/find-by-token-repository';
import { TokenSqlRepository } from './sql/token-sql-repository';

const tokenDefaultRepository = new TokenSqlRepository();

const createTokenRepository: CreateTokenRepository = tokenDefaultRepository;
const findByTokenRepository: FindByTokenRepository = tokenDefaultRepository;

export { createTokenRepository, findByTokenRepository };

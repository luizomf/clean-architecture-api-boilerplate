export interface DeleteTokenByUserIdRepository {
  deleteByUserId(userId: string): Promise<number>;
}

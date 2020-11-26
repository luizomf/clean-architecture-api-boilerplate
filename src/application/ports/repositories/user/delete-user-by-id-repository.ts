export interface DeleteUserByIdRepository {
  deleteById(id: string): Promise<number>;
}

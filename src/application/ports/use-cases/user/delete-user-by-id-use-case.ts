export interface DeleteUserByIdUseCase {
  deleteById(id: string): Promise<number> | never;
}

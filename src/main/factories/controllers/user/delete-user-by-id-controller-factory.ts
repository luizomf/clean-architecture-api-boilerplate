import { DeleteUserByIdController } from '~/presentation/controllers/user/delete-user-by-id-controller';
import { DeleteUserById } from '~/application/use-cases/user/delete-user-by-id';
import {
  deleteUserByIdRepository,
  findUserByIdRepository,
} from '~/infrastructure/repositories/user/user-default-repository';
import { GenericDeletedResponse } from '~/presentation/responses/generic-deleted-response';
import { ValidateStringNotEmpty } from '~/application/validation/common/leaf/validate-string-not-empty';

export const deleteUserByIdControllerFactory = () => {
  const deleteUserByIdValidation = new ValidateStringNotEmpty();
  const deleteUserByIdUseCase = new DeleteUserById(
    deleteUserByIdRepository,
    findUserByIdRepository,
    deleteUserByIdValidation,
  );
  const deleteUserByIdPresenter = new GenericDeletedResponse();
  const deleteUserByIdController = new DeleteUserByIdController(
    deleteUserByIdUseCase,
    deleteUserByIdPresenter,
  );

  return {
    deleteUserByIdController,
    deleteUserByIdPresenter,
    deleteUserByIdUseCase,
    deleteUserByIdValidation,
  };
};

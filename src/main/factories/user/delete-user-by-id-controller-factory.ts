import { DeleteUserByIdController } from '~/interface-adapters/controllers/user/delete-user-by-id-controller';
import { DeletedUserPresenter } from '~/interface-adapters/presenters/responses/user/deleted-user-presenter';
import { RequestParamsIdValidation } from '~/interface-adapters/validation/common/request-params-id-validation';
import { DeleteUserById } from '~/application/use-cases/user/delete-user-by-id';
import {
  deleteUserByIdRepository,
  findUserByIdRepository,
} from '~/infrastructure/repositories/user/user-default-repository';

export const deleteUserByIdControllerFactory = () => {
  const deleteUserByIdUseCase = new DeleteUserById(
    deleteUserByIdRepository,
    findUserByIdRepository,
  );
  const deleteUserByIdValidation = new RequestParamsIdValidation();
  const deleteUserByIdPresenter = new DeletedUserPresenter();
  const deleteUserByIdController = new DeleteUserByIdController(
    deleteUserByIdUseCase,
    deleteUserByIdValidation,
    deleteUserByIdPresenter,
  );

  return {
    deleteUserByIdController,
    deleteUserByIdPresenter,
    deleteUserByIdUseCase,
    deleteUserByIdValidation,
  };
};

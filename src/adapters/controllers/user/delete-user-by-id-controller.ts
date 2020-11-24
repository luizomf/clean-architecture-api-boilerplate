import { Controller } from '~/application/ports/controllers/controller';
import { RequestModel } from '~/application/ports/request/request-model';
import { ResponseModel } from '~/application/ports/response/response-model';
import { DeleteUserByIdUseCase } from '~/application/ports/user/delete-user-by-id-use-case';
import { ValidationComposite } from '~/application/ports/validators/validation-composite';
import { User } from '~/domain/user/user';

export class DeleteUserByIdController implements Controller<User> {
  constructor(
    private readonly deleteUserByIdUseCase: DeleteUserByIdUseCase,
    private readonly validation: ValidationComposite,
  ) {}

  async handleRequest(
    requestModel: RequestModel,
  ): Promise<ResponseModel<User>> {
    await this.validation.validate(requestModel);
    const user = await this.deleteUserByIdUseCase.deleteById(
      requestModel.params.id,
    );

    return {
      statusCode: 200,
      body: user,
    };
  }
}

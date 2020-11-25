/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { RequestValidationError } from '~/application/errors/request-validation-error';
import { Controller } from '~/application/ports/controllers/controller';
import { Presenter } from '~/application/ports/presenters/presenter';
import { ResponseModel } from '~/application/ports/response/response-model';
import { UpdateUserRequestModel } from '~/application/ports/user/models/update-user-request-model';
import { UpdateUserUseCase } from '~/application/ports/user/use-cases/update-user-use-case';
import { ValidationComposite } from '~/application/ports/validators/validation-composite';

export class UpdateUserController implements Controller<void | never> {
  constructor(
    private readonly validation: ValidationComposite,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly presenter: Presenter<void>,
  ) {}

  async handleRequest(
    requestModel: UpdateUserRequestModel,
  ): Promise<ResponseModel<void | never>> {
    if (!requestModel.params || !requestModel.body) {
      throw new RequestValidationError('Missing data');
    }

    await this.validation.validate(requestModel);

    const { id } = requestModel.params;
    const { body } = requestModel;

    await this.updateUserUseCase.update(id, body);
    return await this.presenter.response();
  }
}

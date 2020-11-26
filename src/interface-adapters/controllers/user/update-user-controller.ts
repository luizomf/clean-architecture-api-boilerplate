/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { RequestValidationError } from '~/application/errors/request-validation-error';
import { Controller } from '~/application/ports/controllers/controller';
import { Presenter } from '~/application/ports/presenters/presenter';
import { ResponseModel } from '~/domain/ports/responses/response-model';
import { UpdateUserUseCase } from '~/domain/user/use-cases/update-user-use-case';
import { ValidationComposite } from '~/domain/ports/validation/validation-composite';
import { RequestModel } from '~/domain/ports/requests/request-model';
import {
  UpdateUserRequestModelBody,
  UpdateUserRequestModelParams,
} from '~/domain/user/models/update-user-request-model';

export class UpdateUserController implements Controller<void | never> {
  constructor(
    private readonly validation: ValidationComposite,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly presenter: Presenter<void>,
  ) {}

  async handleRequest(
    requestModel: RequestModel<
      UpdateUserRequestModelBody,
      UpdateUserRequestModelParams
    >,
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

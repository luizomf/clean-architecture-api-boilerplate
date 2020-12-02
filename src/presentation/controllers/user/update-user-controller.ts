/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Controller } from '~/application/ports/controllers/controller';
import { Presenter } from '~/application/ports/presenters/presenter';
import { ResponseModel } from '~/application/ports/responses/response-model';
import { UpdateUserUseCase } from '~/domain/use-cases/user/update-user-use-case';
import { RequestModel } from '~/application/ports/requests/request-model';
import {
  UserRequestPartialFields,
  UpdateUserRequestModelParams,
} from '~/domain/models/user/user-request-partial-fields';
import { RequestValidationError } from '~/application/errors/request-validation-error';

export class UpdateUserController implements Controller<void | never> {
  constructor(
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly presenter: Presenter<void>,
  ) {}

  async handleRequest(
    requestModel: RequestModel<
      UserRequestPartialFields,
      UpdateUserRequestModelParams
    >,
  ): Promise<ResponseModel<void | never>> {
    if (
      !requestModel ||
      !requestModel.body ||
      !requestModel.params ||
      !requestModel.params.id
    ) {
      throw new RequestValidationError('Invalid request');
    }

    const { id } = requestModel.params;
    const { body } = requestModel;

    await this.updateUserUseCase.update(id, body);
    return await this.presenter.response();
  }
}

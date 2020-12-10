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
import { genericStringSanitizerSingleton } from '~/common/adapters/sanitizers/generic/generic-string-sanitizer-adapter';
import { removeObjectEmptyKeys } from '~/common/helpers/objects/remove-object-empty-keys';

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

    const sanitizedBody = {
      email: this.sanitize(body.email),
      first_name: this.sanitize(body.first_name),
      last_name: this.sanitize(body.last_name),
      password: this.sanitize(body.password),
      confirmPassword: this.sanitize(body.confirmPassword),
    };

    await this.updateUserUseCase.update(
      id,
      removeObjectEmptyKeys(sanitizedBody),
    );
    return await this.presenter.response();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private sanitize(value: any): string | undefined {
    if (!value) {
      return;
    }

    return genericStringSanitizerSingleton.sanitize(value);
  }
}

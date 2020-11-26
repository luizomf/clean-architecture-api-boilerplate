import { RequestParamsIdValidation } from '../../common/leaf/request-params-id-validation';
import { RequestParamsValidation } from '../../common/leaf/request-params-validation';
import { UserValidationComposite } from './user-validation-composite';

export class FindUserByIdValidationComposite extends UserValidationComposite {
  constructor() {
    super();
    this.add(new RequestParamsValidation());
    this.add(new RequestParamsIdValidation());
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestModel } from '../../request/request-model';

export type FindAllUsersRequestModel = RequestModel<
  any,
  any,
  {
    order?: 'desc' | 'asc';
    limit?: number;
    offset?: number;
  }
>;

import { RequestModel } from './request-model';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MiddlewareRequestModel extends RequestModel {
  method?: string;
}

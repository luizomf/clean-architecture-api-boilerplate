/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ResponseModel<T> {
  body: T;
  statusCode: number;
}

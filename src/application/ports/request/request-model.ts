/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RequestModel<T = any> {
  body?: T;
  params?: T;
  query?: T;
}

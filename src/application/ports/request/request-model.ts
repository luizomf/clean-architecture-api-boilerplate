/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RequestModel<B = any, P = B, Q = B> {
  body?: B;
  params?: P;
  query?: Q;
}

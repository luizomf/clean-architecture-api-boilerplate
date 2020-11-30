/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RequestModel<B = any, P = B, Q = B, H = B> {
  body?: B;
  params?: P;
  query?: Q;
  headers?: H;
}

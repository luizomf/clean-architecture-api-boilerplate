/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Sanitizer<I = any, O = any> {
  sanitize(value: I): O;
}

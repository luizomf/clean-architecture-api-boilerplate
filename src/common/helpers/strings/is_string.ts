export const isString = (value: unknown): value is string => {
  if (typeof value === 'string') return true;
  return false;
};

export const getPort = () => {
  if (process.env.NODE_ENV === 'test') {
    return 4322;
  }
  return process.env.PORT || 4321;
};

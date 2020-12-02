import { zeroPadLeft } from './zero-pad-left';

export const formatDateTime = (date: Date): string => {
  const day = zeroPadLeft(2, date.getDate());
  const month = zeroPadLeft(2, date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = zeroPadLeft(2, date.getHours());
  const minutes = zeroPadLeft(2, date.getMinutes());
  const seconds = zeroPadLeft(2, date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

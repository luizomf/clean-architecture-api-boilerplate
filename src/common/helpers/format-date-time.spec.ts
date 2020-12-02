/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDateTime } from './format-date-time';

const sutFactory = () => {
  const sut = formatDateTime;

  return {
    sut,
  };
};

describe('formatDateTime', () => {
  it('should receive a date and return format yyyy-mo-dd hh:mi:ss', async () => {
    const { sut } = sutFactory();
    const date = new Date('2020-12-01T13:02:01-0300');
    const dateString = sut(date);
    expect(dateString).toBe('2020-12-01 13:02:01');
  });

  it('should throw if value received is not of type Date', async () => {
    const { sut } = sutFactory();
    const date = '' as any;
    let error;

    try {
      sut(date);
    } catch (e) {
      error = e;
    }

    expect(error.name).toBe('DateTimeError');
  });
});

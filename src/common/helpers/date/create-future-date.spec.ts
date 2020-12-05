/* eslint-disable @typescript-eslint/no-explicit-any */

import { createFutureDate } from './create-future-date';

const sutFactory = () => {
  const sut = createFutureDate;

  return {
    sut,
  };
};

describe('createFutureDate', () => {
  it('should add 3600 seconds to date', async () => {
    const { sut } = sutFactory();
    const date = new Date('2020-12-01T13:02:01.000Z');
    const dateString = sut(date, 3600);
    expect(dateString.toISOString()).toBe('2020-12-01T14:02:01.000Z');
  });
});

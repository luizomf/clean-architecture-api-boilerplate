import { zeroPadLeft } from './zero-pad-left';

const sutFactory = () => {
  const sut = zeroPadLeft;

  return {
    sut,
  };
};

describe('zeroPadLeft', () => {
  it('should add one left zero and return a string', async () => {
    const { sut } = sutFactory();
    const number = sut(5, 1000);
    expect(number).toBe('01000');
  });

  it('should add three left zeros and return a string', async () => {
    const { sut } = sutFactory();
    const number = sut(5, 10);
    expect(number).toBe('00010');
  });

  it('should add thirteen left zeros and return a string', async () => {
    const { sut } = sutFactory();
    const number = sut(15, 10);
    expect(number).toBe('000000000000010');
  });
});

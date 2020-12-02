export const zeroPadLeft = (maxLength: number, numberToPad: number) => {
  return numberToPad.toString().padStart(maxLength, '0');
};

export const businessNumberFormat = (number: string): string => {
  if (!number || number.length !== 10) return number; // 유효성 검사

  return `${number.slice(0, 3)}-${number.slice(3, 5)}-${number.slice(5)}`;
};

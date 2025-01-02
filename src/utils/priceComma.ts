export const priceComma = (x: number | string | undefined): string => {
  if (x === '' || x === undefined) {
    return '0';
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

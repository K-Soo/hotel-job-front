// utils/format.ts
export const formatToManWon = (amount: number): string => {
  if (amount < 10000) return `${amount.toLocaleString()}`;
  return `${(amount / 10000).toLocaleString()}`;
};

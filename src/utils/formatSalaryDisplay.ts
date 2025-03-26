import { SalaryTypeKeys } from '@/types';

export function formatSalaryDisplay(amount: number, salary: SalaryTypeKeys): string {
  if (salary === 'ANNUAL' || salary === 'MONTHLY') {
    const converted = amount / 10000; // 만원 단위

    return `${converted.toLocaleString()}만원`;
  }
  return `${amount.toLocaleString()}원`;
}

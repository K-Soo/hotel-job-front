import { SalaryType } from '@/types';

export const minimumWage: Record<SalaryType, string> = {
  ANNUAL: '연봉 25,155,240원(월 209시간 기준)',
  MONTHLY: '월급 2,096,270원(월 209시간 기준)',
  DAILY: '주급 401,200원(주 40시간 기준)',
  HOURLY: '일급 80,240원(일 8시간 기준)',
  CASE: '일급 80,240원(일 8시간 기준)',
} as const;

import { educationLevel, position, salaryType } from '@/constants';
import { allJobs } from '@/constants/job';

export const salaryTypeOptions = [
  { label: '선택', value: '' },
  { label: '연봉', value: 'ANNUAL' },
  { label: '월급', value: 'MONTHLY' },
  { label: '일급', value: 'DAILY' },
  { label: '시급', value: 'HOURLY' },
];

export const positionOptions = [
  { label: '선택', value: 'NONE' },
  { label: '인턴', value: 'INTERN' },
  { label: '알바', value: 'PART_TIME' },
];

export const productUseDateOptions = [
  { label: '3일', value: '3' },
  { label: '5일', value: '5' },
  { label: '7일', value: '7' },
  { label: '10일', value: '10' },
  { label: '14일', value: '14' },
  { label: '21일', value: '21' },
];

export const educationConditionLevelOptions = [
  { label: '학력무관', value: 'NOT_REQUIRED' },
  ...Object.entries(educationLevel).map(([key, value]) => ({ label: value, value: key })),
];

export const optionalJobOptions = [
  { label: '선택', value: '' },
  ...Object.entries(allJobs).map(([key, value]) => ({ label: value, value: key })),
];

export const optionalPositionOptions = [
  { label: '선택', value: '' },
  ...Object.entries(position).map(([key, value]) => ({ label: value, value: key })),
];

export const requiredSalaryTypeOptions = [...Object.entries(salaryType).map(([key, value]) => ({ label: value, value: key }))];

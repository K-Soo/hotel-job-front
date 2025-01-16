import { EDUCATION_LEVEL, POSITION, SALARY_TYPE } from '@/constants';
import { ALL_JOBS } from '@/constants/job';

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

export const educationConditionLevelOptions = [...Object.entries(EDUCATION_LEVEL).map(([key, value]) => ({ label: value, value: key }))];

export const optionalJobOptions = [
  { label: '선택', value: '' },
  ...Object.entries(ALL_JOBS).map(([key, value]) => ({ label: value, value: key })),
];

export const optionalPositionOptions = [
  { label: '선택', value: '' },
  ...Object.entries(POSITION).map(([key, value]) => ({ label: value, value: key })),
];

export const requiredSalaryTypeOptions = [...Object.entries(SALARY_TYPE).map(([key, value]) => ({ label: value, value: key }))];

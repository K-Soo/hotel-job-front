import * as yup from 'yup';
import { careerLevel, salaryType, job, position } from '@/constants/resume';
import { validation } from '@/utils/validation';
import { CareerLevel, SalaryType, Job, Position } from '@/types';

const careerLevelKeyValue = Object.keys(careerLevel) as CareerLevel[];
const salaryTypeKeyValue = Object.keys(salaryType) as SalaryType[];
const jobKeyValue = Object.keys(job) as Job[];
const positionKeyValue = Object.keys(position) as Position[];

const signInSchema = yup.object({
  userId: validation.USER_ID,
  password: validation.PASSWORD,
});

const resumeRegister = yup.object({
  resumeType: yup.string().oneOf(['FILE', 'GENERAL']).required(),
  careerLevel: yup.string().oneOf(careerLevelKeyValue).required(),
  title: yup.string().required(),
  summary: yup.string().required(),
  experiences: yup
    .array(
      yup.object({
        companyName: yup.string().required(),
        salaryType: yup.string().oneOf(salaryTypeKeyValue).default(undefined),
        job: yup.string().oneOf(jobKeyValue).default(undefined),
        position: yup.string().oneOf(positionKeyValue).required(),
        responsibility: yup.string().default(''),
        startDate: yup.date().required(),
        endDate: yup.date().required(),
      }),
    )
    .default([]),
});

export const schema = { signInSchema, resumeRegister };

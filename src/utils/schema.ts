import * as yup from 'yup';
import { careerLevel, salaryType, job, position, educationLevel, licenseStage } from '@/constants/resume';
import { validation } from '@/utils/validation';
import { CareerLevel, SalaryType, Job, Position, EducationLevel, LicenseStage } from '@/types';

const careerLevelKeyValue = Object.keys(careerLevel) as CareerLevel[];
const salaryTypeKeyValue = Object.keys(salaryType) as SalaryType[];
const jobKeyValue = Object.keys(job) as Job[];
const positionKeyValue = Object.keys(position) as Position[];
const educationLevelKeyValue = Object.keys(educationLevel) as EducationLevel[];
const licenseStageKeyValue = Object.keys(licenseStage) as LicenseStage[];

const signInSchema = yup.object({
  userId: validation.USER_ID,
  password: validation.PASSWORD,
});

const resumeRegister = yup.object({
  resumeType: yup.string().oneOf(['FILE', 'GENERAL']).required(),
  careerLevel: yup.string().oneOf(careerLevelKeyValue).required(),
  title: yup.string().required(),
  summary: yup.string().required(),
  education: yup.string().oneOf(educationLevelKeyValue).required(),
  isRequiredAgreement: yup.boolean().default(false).oneOf([true]),
  isOptionalAgreement: yup.boolean().default(false).oneOf([true]),
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
        isEmployed: yup.boolean().default(false),
      }),
    )
    .default([]),
  licenses: yup
    .array(
      yup.object({
        licenseName: yup.string().required(),
        licenseStage: yup.string().oneOf(licenseStageKeyValue).default(undefined),
        dateOfCompletion: yup.date().required(),
      }),
    )
    .default([]),
});

const signUpSchema = yup.object({
  userId: validation.USER_ID,
  password: validation.PASSWORD,
});

const businessForm = yup.object({
  businessName: yup.string().required(),
  businessRegistrationNumber: yup.string().required(),
  tradeName: yup.string().required(),
});

const businessManagerForm = yup.object({
  managerName: yup.string().required(),
  managerNumber: yup.string().required(),
  managerEmail: yup.string().required(),
});

export const schema = { signInSchema, resumeRegister, signUpSchema, businessForm, businessManagerForm };

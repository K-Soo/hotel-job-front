import * as yup from 'yup';
import { careerLevel, position, licenseStage } from '@/constants/resume';
import { educationLevel, salaryType } from '@/constants';
import { job } from '@/constants/job';
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
        position: yup.string().oneOf(positionKeyValue).default(undefined),
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
  businessRegistrationNumber: yup.string().required(),
  companyName: yup.string().required(),
  businessOwner: yup.string().required(),
});

const businessManagerForm = yup.object({
  managerName: yup.string().required(),
  managerNumber: yup.string().required(),
  managerEmail: yup.string().required(),
});

const setupCompanyForm = yup.object({
  businessRegistrationNumber: validation.REQUIRED_TEXT_1({ minLength: 10, maxLength: 10 }),
  companyName: validation.REQUIRED_TEXT_1({ minLength: 2, maxLength: 30 }), //상호
  businessOwner: validation.REQUIRED_TEXT_2({ minLength: 2, maxLength: 10 }),

  address: yup.string().required('주소를 검색해주세요'),
  addressDetail: validation.REQUIRED_TEXT_1({ minLength: 2, maxLength: 30 }),

  managerName: validation.REQUIRED_TEXT_2({ minLength: 2, maxLength: 10 }),
  managerNumber: validation.PHONE,
  managerEmail: validation.REQUIRED_EMAIL(),
});

export const schema = { signInSchema, resumeRegister, signUpSchema, businessForm, businessManagerForm, setupCompanyForm };

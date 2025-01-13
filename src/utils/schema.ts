import * as yup from 'yup';
import { careerLevel, position, licenseStage } from '@/constants/resume';
import { experienceCondition, recruitmentStatus, workingDayList } from '@/constants/recruitment';
import { educationLevel, salaryType } from '@/constants';
import { allJobs, allJobsKeyValues, AllJobsKeyValuesKeys, allJobsKeyValuesKeys } from '@/constants/job';
import { benefits } from '@/constants/benefits';
import { validation } from '@/utils/validation';
import {
  CareerLevelKeys,
  SalaryTypeKeys,
  Position,
  EducationLevelKeys,
  LicenseStageKeys,
  experienceConditionKeys,
  RecruitmentStatusKeys,
  WorkingDayListKeys,
  BenefitsKeys,
} from '@/types';

const careerLevelKeyValue = Object.keys(careerLevel) as CareerLevelKeys[];
const salaryTypeKeyValue = Object.keys(salaryType) as SalaryTypeKeys[];
const jobKeyValue = Object.keys(allJobs) as AllJobsKeyValuesKeys[];
const positionKeys = Object.keys(position) as Position[];
const educationLevelKeys = Object.keys(educationLevel) as EducationLevelKeys[];
const licenseStageKeyValue = Object.keys(licenseStage) as LicenseStageKeys[];

const workingDayListKeyValue = Object.keys(workingDayList) as WorkingDayListKeys[];

const experienceLevelValue = Object.keys(experienceCondition) as experienceConditionKeys[];
const recruitmentStatusKeys = Object.keys(recruitmentStatus) as RecruitmentStatusKeys[];
const benefitsKeys = Object.keys(benefits) as BenefitsKeys[];
// const allJobsKeyValuesKeys = Object.keys(allJobsKeyValues) as AllJobsKeyValuesKeys[];

const signInSchema = yup.object({
  userId: validation.USER_ID,
  password: validation.PASSWORD,
});

const resumeRegister = yup.object({
  resumeType: yup.string().oneOf(['FILE', 'GENERAL']).required(),
  careerLevel: yup.string().oneOf(careerLevelKeyValue).required(),
  title: yup.string().required(),
  summary: yup.string().required(),
  education: yup.string().oneOf(educationLevelKeys).required(),
  isRequiredAgreement: yup.boolean().default(false).oneOf([true]),
  isOptionalAgreement: yup.boolean().default(false).oneOf([true]),
  experiences: yup
    .array(
      yup.object({
        companyName: yup.string().required(),
        salaryType: yup.string().oneOf(salaryTypeKeyValue).default(undefined),
        job: yup.string().oneOf(jobKeyValue).default(undefined),
        position: yup.string().oneOf(positionKeys).default(undefined),
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
  passwordConfirm: validation.PASSWORD_CONFIRM,

  ageAgree: yup.boolean().default(false).oneOf([true], '필수 동의'),
  personalInfoAgree: yup.boolean().default(false).oneOf([true], '필수 동의'),
  serviceTermsAgree: yup.boolean().default(false).oneOf([true], '필수 동의'),
  smsMarketingAgree: yup.boolean().default(false),
  emailMarketingAgree: yup.boolean().default(false),

  userIdAvailableState: yup.boolean().default(false),
});

const businessManagerForm = yup.object({
  businessRegistrationNumber: yup.string().required(),
  companyName: yup.string().required(),
  businessOwner: yup.string().required(),

  address: yup.string().required(),
  addressDetail: yup.string().required(),

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

const oauthSignInSchema = yup.object({
  code: yup.string().required(),
  requestType: yup.string().oneOf(['signIn', 'signUp']).required(),
  ageAgree: yup.boolean().default(false).oneOf([true], '필수 동의'),

  personalInfoAgree: yup.boolean().default(false).oneOf([true], '필수 동의'),
  serviceTermsAgree: yup.boolean().default(false).oneOf([true], '필수 동의'),

  smsMarketingAgree: yup.boolean().default(false),
  emailMarketingAgree: yup.boolean().default(false),
});

const recruitmentSchema = yup.object({
  recruitmentTitle: validation.REQUIRED_TEXT_1({ minLength: 5, maxLength: 30 }),
  recruitmentStatus: yup.string().oneOf(recruitmentStatusKeys).required(),
  // 모집내용
  recruitmentInfo: yup.object({
    jobs: yup
      .array()
      .of(yup.string().oneOf(allJobsKeyValuesKeys as AllJobsKeyValuesKeys[], '유효하지 않은 직무입니다.'))
      .min(1, '최소 한 개의 직무를 선택해야 합니다.')
      .max(3, '최대 3개까지 선택 가능합니다.')
      .required('직무를 선택해야 합니다.'),
    experienceCondition: yup.string().oneOf(experienceLevelValue).required('필수 선택'),
    recruitmentCapacity: yup.number().min(1, '모집인원을 입력해주세요.').max(3, '최대 3명까지 가능합니다.').required(),
    educationCondition: yup
      .string()
      .oneOf([...educationLevelKeys, 'NOT_REQUIRED'])
      .required(),
    nationality: yup
      .object({
        korean: yup.boolean().required(),
        foreigner: yup.boolean().required(),
        marriageVisa: yup.string().when('foreigner', {
          is: true,
          then: (schema) => schema.required('비자 조건을 입력해주세요.').min(2, '2자 이상').max(30, '30자 이하'),
          otherwise: (schema) => schema.notRequired(),
        }),
      })
      .test('at-least-one-selected', '내국인 또는 외국인 중 하나는 선택해야 합니다.', function (value) {
        const { path, createError } = this;
        if (!value || (value.korean === false && value.foreigner === false)) {
          return createError({
            path: `${path}.korean`, // korean 필드에 에러 바인딩
            message: '내국인 또는 외국인 중 하나는 필수 선택입니다.',
          });
        }
        return true;
      }),
    preferences: yup
      .array()
      .of(yup.string().oneOf(['???']).strict().required())
      .default([]),
    department: yup.string().default(''),
    position: yup.string().oneOf(['???']).nullable().default(null),
  }),
  content: yup.string().required('상세 모집내용을 입력해주세요.'),
  // 근무조건
  conditionInfo: yup.object({
    benefits: yup.array().of(yup.string().oneOf(benefitsKeys).strict().required()).default([]),
    workingDay: yup.string().oneOf(workingDayListKeyValue).nullable().default(null),
    salaryType: yup.string().oneOf(salaryTypeKeyValue).required('필수 선택'),
    workingTime: yup.object({
      start: yup.string().default(''),
      end: yup.string().default(''),
    }),
    salaryAmount: yup.number().typeError('급여액은 숫자여야 합니다.').min(10000, '10,030원 이상').default(0).required(),
    employmentType: yup
      .object({
        FULL_TIME: yup.boolean().default(false),
        CONTRACT: yup.boolean().default(false),
        DAILY_WORKER: yup.boolean().default(false),
        INTERN: yup.boolean().default(false),
        PART_TIME: yup.boolean().default(false),
      })
      .test('employmentType-selected', '근무형태를 선택해주세요.!!!', function (value) {
        const { path, createError } = this;
        const valid = Object.values(value).every((v) => v === false);
        if (valid) {
          return createError({
            path: `${path}.FULL_TIME`,
            message: '근무형태를 선택해주세요.',
          });
        }
        return true;
      }),
  }),
  // 근무지 정보
  locationInfo: yup.object({
    roomCount: yup.number().min(0, '객실수를 입력해주세요.').required(),
    address: yup.string().required('주소를 검색해주세요'),
    addressDetail: yup.string().required(),
  }),

  managerInfo: yup.object({
    managerName: validation.REQUIRED_TEXT_2({ minLength: 2, maxLength: 10 }),
    isNamePrivate: yup.boolean().default(false),

    managerNumber: validation.PHONE,
    isNumberPrivate: yup.boolean().default(false),

    managerEmail: validation.REQUIRED_EMAIL(),
    isEmailPrivate: yup.boolean().default(false),
  }),
});

const recruitmentDetailSchema = yup.object({
  recruitmentTitle: validation.REQUIRED_TEXT_1({ minLength: 5, maxLength: 30 }),
  recruitmentStatus: yup.string().oneOf(recruitmentStatusKeys).required(),

  recruitmentInfo: yup.object({
    recruitmentCapacity: yup.number().min(1, '모집인원을 입력해주세요.').max(3, '최대 3명까지 가능합니다.').required(),
    educationCondition: yup
      .string()
      .oneOf([...educationLevelKeys, 'NOT_REQUIRED'])
      .required(),
    experienceCondition: yup.string().oneOf(experienceLevelValue).required('필수 선택'),
    nationality: yup.object({
      korean: yup.boolean().required(),
      foreigner: yup.boolean().required(),
      marriageVisa: yup.string().when('foreigner', {
        is: true,
        then: (schema) => schema.required('비자 조건을 입력해주세요.').min(2, '2자 이상').max(30, '30자 이하'),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),
  }),
});

export const schema = {
  signInSchema,
  resumeRegister,
  signUpSchema,
  businessManagerForm,
  setupCompanyForm,
  oauthSignInSchema,
  recruitmentSchema,
  recruitmentDetailSchema,
};

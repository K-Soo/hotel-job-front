import * as yup from 'yup';
import { careerLevel, position, LICENSE_STAGE } from '@/constants/resume';
import { PREFERENCES } from '@/constants/preferences';
import { EXPERIENCE_CONDITION, RECRUITMENT_STATUS, WORKING_DAY_LIST } from '@/constants/recruitment';
import { EDUCATION_LEVEL, SALARY_TYPE } from '@/constants';
import { ALL_JOBS, allJobsKeyValues, AllJobsKeyValuesKeys, allJobsKeyValuesKeys } from '@/constants/job';
import { BENEFITS } from '@/constants/benefits';
import { validation } from '@/utils/validation';
import {
  CareerLevelKeys,
  SalaryTypeKeys,
  PositionKeys,
  EducationLevelKeys,
  LicenseStageKeys,
  experienceConditionKeys,
  RecruitmentStatusKeys,
  WorkingDayListKeys,
  BenefitsKeys,
  PreferencesKeys,
  LanguageKey,
  LanguageLevelKey,
} from '@/types';
import { LANGUAGE, LANGUAGE_LEVEL } from '@/constants/language';

const careerLevelKeyValue = Object.keys(careerLevel) as CareerLevelKeys[];
const salaryTypeKeyValue = Object.keys(SALARY_TYPE) as SalaryTypeKeys[];
const jobKeyValue = Object.keys(ALL_JOBS) as AllJobsKeyValuesKeys[];
const positionKeys = Object.keys(position) as PositionKeys[];
const educationLevelKeys = Object.keys(EDUCATION_LEVEL) as EducationLevelKeys[];
const licenseStageKeyValue = Object.keys(LICENSE_STAGE) as LicenseStageKeys[];
const preferencesKeyValue = Object.keys(PREFERENCES) as PreferencesKeys[];

const workingDayListKeyValue = Object.keys(WORKING_DAY_LIST) as WorkingDayListKeys[];

const experienceLevelValue = Object.keys(EXPERIENCE_CONDITION) as experienceConditionKeys[];
const recruitmentStatusKeys = Object.keys(RECRUITMENT_STATUS) as RecruitmentStatusKeys[];
const benefitsKeys = Object.keys(BENEFITS) as BenefitsKeys[];
const languageKey = Object.keys(LANGUAGE) as LanguageKey[];
const languageLevelKey = Object.keys(LANGUAGE_LEVEL) as LanguageLevelKey[];
// const allJobsKeyValuesKeys = Object.keys(allJobsKeyValues) as AllJobsKeyValuesKeys[];

const signInSchema = yup.object({
  userId: validation.USER_ID,
  password: validation.PASSWORD,
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
      .max(5, '최대 5개까지 선택 가능합니다.')
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
    preferences: yup.array().of(yup.string().oneOf(preferencesKeyValue).strict().required()).default([]),
    department: yup.string().default(''),
    position: yup.string().oneOf(positionKeys).nullable().default(null),
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
    salaryAmount: yup.number().typeError('급여액은 숫자여야 합니다.').min(10030, '10,030원 이상').default(0).required(),
    employmentType: yup
      .object({
        FULL_TIME: yup.boolean().default(false),
        CONTRACT: yup.boolean().default(false),
        DAILY_WORKER: yup.boolean().default(false),
        INTERN: yup.boolean().default(false),
        PART_TIME: yup.boolean().default(false),
      })
      .test('employmentType-selected', '고용형태를 선택해주세요.!!!', function (value) {
        const { path, createError } = this;
        const valid = Object.values(value).every((v) => v === false);
        if (valid) {
          return createError({
            path: `${path}.FULL_TIME`,
            message: '고용형태를 선택해주세요.',
          });
        }
        return true;
      }),
  }),
  // 근무지 정보
  locationInfo: yup.object({
    hotelName: validation.REQUIRED_TEXT_1({ minLength: 2, maxLength: 20 }),
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

const resumeRegister = yup.object({
  resumeType: yup.string().oneOf(['FILE', 'GENERAL']).required(),
  careerLevel: yup.string().oneOf(careerLevelKeyValue).required(),
  title: validation.REQUIRED_TEXT_1({ minLength: 5, maxLength: 30 }),
  profileImage: yup.string().default(''),
  name: yup.string().required(),
  localCode: yup.string().oneOf(['01', '02']).required().default(undefined),
  sexCode: yup.string().oneOf(['01', '02']).required().default(undefined),
  phone: yup.string().required(),
  birthday: yup.string().required(),
  email: validation.REQUIRED_EMAIL(),
  address: yup.string().required(),
  addressDetail: yup.string().required(),
  summary: yup.string().default(''),
  education: yup.string().oneOf(educationLevelKeys).required(),
  experience: yup
    .array(
      yup.object({
        companyName: yup.string().required(),
        job: yup.string().oneOf(jobKeyValue).required(),
        position: yup.string().oneOf(positionKeys).nullable().default(null),
        responsibility: yup.string().default(''),
        startDate: yup.date().default(null).required('필수선택'),
        endDate: yup
          .date()
          .nullable()
          .default(null)
          .when('isEmployed', {
            is: false,
            then: (schema) => schema.required('재직중이 아닙니다.'),
            otherwise: (schema) => schema.nullable(),
          }),
        isEmployed: yup.boolean().default(false),
        // .test('clear-endDate-if-employed', '', function (value) {
        //   const { path, createError } = this;

        //   // isEmployed가 true인 경우 endDate의 에러를 클리어하고 값을 null로 설정
        //   if (value === true) {
        //     if (this.parent.endDate) {
        //       this.parent.endDate = null; // endDate를 null로 초기화
        //     }
        //   } else if (!this.parent.endDate) {
        //     // isEmployed가 false인데 endDate가 비어 있으면 에러 생성
        //     return createError({
        //       path: `${path}.endDate`, // endDate 필드에 에러 바인딩
        //       message: '퇴직일을 입력해야 합니다.',
        //     });
        //   }

        //   return true;
        // }),
        reasonForLeaving: yup.string().default(''),
      }),
    )
    .default([]),

  licenses: yup
    .array(
      yup.object({
        licenseName: yup.string().required(),
        licenseStage: yup.string().oneOf(licenseStageKeyValue).required(),
      }),
    )
    .default([]),
  languages: yup
    .array(
      yup.object({
        name: yup.string().oneOf(languageKey).nullable().default(null),
        level: yup.string().oneOf(languageLevelKey).nullable().default(null),
      }),
    )
    .default([]),
  isRequiredAgreement: yup.boolean().default(false).oneOf([true]),
  isOptionalAgreement: yup.boolean().default(false).oneOf([true]),
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

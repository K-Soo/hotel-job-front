import * as API from '@/types/API';
import { careerLevel, licenseStage } from '@/constants/resume';
import { EXPERIENCE_CONDITION, RECRUITMENT_STATUS, WORKING_DAY_LIST } from '@/constants/recruitment';
import { AllJobsKeyValuesKeys } from '@/constants/job';
import { EDUCATION_LEVEL, POSITION, SALARY_TYPE } from '@/constants';
import { city } from '@/constants/location';
import { BENEFITS } from '@/constants/benefits';
import { PREFERENCES } from '@/constants/preferences';

export type ProviderType = 'local' | 'kakao';
export type RoleType = 'ADMIN' | 'EMPLOYER' | 'JOB_SEEKER';
export type CompanyVerificationStatus = 'NOT_REQUESTED' | 'PENDING' | 'VERIFIED' | 'REJECTED';
export type EmploymentType = 'FULL_TIME' | 'CONTRACT' | 'DAILY_WORKER' | 'INTERN';

export type AccountStatusType =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'BLOCKED'
  | 'SUSPENDED'
  | 'LOCKED'
  | 'DELETED'
  | 'PENDING'
  | 'RECOVERY'
  | 'ANONYMIZED'
  | 'WAITING_APPROVAL'
  | 'WAITING_APPROVAL';

export type ResumeType = 'FILE' | 'GENERAL'; //파일, 일반
export type CareerLevelKeys = keyof typeof careerLevel;
export type EducationLevelKeys = keyof typeof EDUCATION_LEVEL;
export type PositionKeys = keyof typeof POSITION;
export type CityKeys = keyof typeof city;
export type SalaryTypeKeys = keyof typeof SALARY_TYPE;
export type LicenseStageKeys = keyof typeof licenseStage;
export type experienceConditionKeys = keyof typeof EXPERIENCE_CONDITION;
export type RecruitmentStatusKeys = keyof typeof RECRUITMENT_STATUS;
export type WorkingDayListKeys = keyof typeof WORKING_DAY_LIST;
export type BenefitsKeys = keyof typeof BENEFITS;
export type PreferencesKeys = keyof typeof PREFERENCES;

export type TalentListItem = {};

export type RecruitmentItem = {
  id: string;
  recruitmentTitle: string;
  recruitmentStatus: RecruitmentStatusKeys;
};

export type Experience = {
  companyName: string;
  isEmployed: boolean; //재직중
  responsibility: string; //담당업무
  job: AllJobsKeyValuesKeys | undefined; //직무
  position?: PositionKeys; //직급/직책
  startDate: Date;
  endDate: Date;
  // city: CityKeys;
  salaryType?: SalaryTypeKeys | undefined; //급여 유형
  // baseSalary: number; //급여 금액
  // allowance: number; //수당
  // reasonForLeaving: string; //퇴사사유
};

export type Language = {};

export type License = {
  licenseName: string;
  licenseStage?: LicenseStageKeys | undefined;
  dateOfCompletion: Date;
};

export type Military = {};

export interface SignInForm extends API.SignInRequest {}

export interface ResumeRegisterForm {
  resumeType: ResumeType;
  careerLevel: CareerLevelKeys;
  title: string;
  summary: string;
  education: EducationLevelKeys;
  // isGraduated: boolean; //졸업여부
  // experiences: Experience[];
  // languages: Language[];
  // introduction: string; //자기소개
  licenses: License[];
  // military: Military;
  isRequiredAgreement: boolean;
  isOptionalAgreement: boolean;
}

export interface SignUpForm {
  userId: string;
  password: string;
  passwordConfirm: string;

  ageAgree: boolean;
  personalInfoAgree: boolean;
  serviceTermsAgree: boolean;
  smsMarketingAgree: boolean;
  emailMarketingAgree: boolean;

  userIdAvailableState: boolean;
}

export interface SetupCompanyForm {
  businessRegistrationNumber: string; // 사업자번호
  companyName: string; // 상호명
  businessOwner: string; // 사업자명

  address: string; // 주소
  addressDetail: string; // 상세주소

  managerName: string;
  managerNumber: string;
  managerEmail: string;
}

export interface EmployerBusinessForm {
  businessRegistrationNumber: string; // 사업자번호
  companyName: string; // 상호명
  businessOwner: string; // 사업자명

  address: string;
  addressDetail: string;

  managerName: string;
  managerNumber: string;
  managerEmail: string;
}

export interface OAuthSignInForm {
  code: string;
  requestType: 'signIn' | 'signUp';

  ageAgree: boolean;

  personalInfoAgree: boolean;
  serviceTermsAgree: boolean;

  smsMarketingAgree: boolean;
  emailMarketingAgree: boolean;
}

export interface EmployerAccountInfoForm {
  accountStatus: 'ACTIVE';
  certification: null;
  certificationStatus: 'UNVERIFIED';
  companyVerificationStatus: 'VERIFIED';
  createdAt: '2025-01-03T14:50:54.000Z';
  id: '5ef779c1-7eed-4fff-b155-1650bc2fe0a1';
  nickname: '활기찬고양이94896177';
  password: '$2b$10$4xXDvSN.pWV25S0fxHW2Xuqp5yBdZVOc/mjNx53bjBuGBtWWG41cS';
  passwordChangedAt: null;
  provider: 'LOCAL';
  role: 'EMPLOYER';
  updatedAt: '2025-01-07T18:01:26.000Z';
  userId: 'kanabun102';
}

// 공고 등록 폼
export interface CreateRecruitmentForm {
  recruitmentTitle: string;
  recruitmentStatus: RecruitmentStatusKeys;
  recruitmentInfo: {
    jobs: any[];
    experienceCondition: experienceConditionKeys;
    recruitmentCapacity: number;
    educationCondition: 'NOT_REQUIRED' | EducationLevelKeys;
    nationality: {
      korean: boolean;
      foreigner: boolean;
      marriageVisa?: string;
    };
    department: string; // 근무부서
    position: PositionKeys | null; // 직급
    preferences: PreferencesKeys[];
  };
  conditionInfo: {
    employmentType: {
      CONTRACT: boolean;
      DAILY_WORKER: boolean;
      FULL_TIME: boolean;
      INTERN: boolean;
      PART_TIME: boolean;
    };
    salaryType: SalaryTypeKeys;
    salaryAmount: number;
    workingDay: WorkingDayListKeys | null;
    workingTime: { start: string; end: string };
    benefits: BenefitsKeys[];
  };
  content: string;
  locationInfo: {
    hotelName: string;
    roomCount: number;
    address: string;
    addressDetail: string;
  };
  managerInfo: {
    managerName: string;
    isNamePrivate: boolean;

    managerNumber: string;
    isNumberPrivate: boolean;

    managerEmail: string;
    isEmailPrivate: boolean;
  };
}

// response 공고 상세
export interface RecruitmentDetail {
  id: string;
  recruitmentTitle: string;
  recruitmentStatus: RecruitmentStatusKeys;
  recruitmentInfo: {
    jobs: any[];
    experienceCondition: experienceConditionKeys;
    recruitmentCapacity: number;
    educationCondition: 'NOT_REQUIRED' | EducationLevelKeys;
    nationality: {
      korean: boolean;
      foreigner: boolean;
      marriageVisa?: string;
    };
    preferences: PreferencesKeys[];
    department: string; // 근무부서
    position: PositionKeys | null; // 직급
  };
  content: string;
  conditionInfo: {
    employmentType: {
      CONTRACT: boolean;
      DAILY_WORKER: boolean;
      FULL_TIME: boolean;
      INTERN: boolean;
      PART_TIME: boolean;
    };
    salaryType: SalaryTypeKeys;
    salaryAmount: number;
    workingDay: WorkingDayListKeys | null;
    workingTime: { start: string; end: string };
    benefits: BenefitsKeys[];
  };
  locationInfo: {
    hotelName: string;
    roomCount: number;
    address: string;
    addressDetail: string;
  };
  managerInfo: {
    managerName: string;
    isNamePrivate: boolean;

    managerNumber: string;
    isNumberPrivate: boolean;

    managerEmail: string;
    isEmailPrivate: boolean;
  };
  updateAt: Date;
}

export interface RecruitmentDetailForm extends Omit<RecruitmentDetail, 'id' | 'updateAt'> {}

export interface RecruitListItem {
  experienceCondition: experienceConditionKeys;
  id: string;
  recruitmentTitle: string;
  salaryAmount: number;
  hotelName: string;
  jobs: AllJobsKeyValuesKeys[];
  salaryType: SalaryTypeKeys;
  address: string;
  addressDetail: string;
  employmentType: {
    CONTRACT: boolean;
    DAILY_WORKER: boolean;
    FULL_TIME: boolean;
    INTERN: boolean;
    PART_TIME: boolean;
  };
}

export interface IRecruitDetail {
  address: string;
  addressDetail: string;
  benefits: BenefitsKeys[];
  content: string;
  createdAt: string;
  department: string; //근무부서
  educationCondition: EducationLevelKeys;
  employmentType: { INTERN: boolean; CONTRACT: boolean; FULL_TIME: boolean; PART_TIME: boolean; DAILY_WORKER: boolean };
  experienceCondition: 'NOT_REQUIRED';
  hotelName: string;
  id: string;
  isEmailPrivate: boolean; //비공개 여부
  isNamePrivate: boolean; //비공개 여부
  isNumberPrivate: boolean; //비공개 여부
  jobs: AllJobsKeyValuesKeys[];
  managerEmail: string;
  managerName: string;
  managerNumber: string;
  position: PositionKeys | null;
  preferences: PreferencesKeys[];
  recruitmentCapacity: number; //모집인원
  recruitmentStatus: 'PUBLISHED';
  recruitmentTitle: string;
  roomCount: number;
  salaryAmount: number;
  salaryType: SalaryTypeKeys;
  updatedAt: string;
  workingDay: WorkingDayListKeys;
  workingTime: { end: string; start: string };
  nationality: {
    korean: boolean;
    foreigner: boolean;
    marriageVisa: string;
  };
}

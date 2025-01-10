import * as API from '@/types/API';
import { careerLevel, licenseStage } from '@/constants/resume';
import { experienceCondition, recruitmentStatus } from '@/constants/recruitment';
import { city } from '@/constants/location';
import { educationLevel, position, salaryType } from '@/constants';
import { job } from '@/constants/job';

export type ProviderType = 'local' | 'kakao';
export type RoleType = 'ADMIN' | 'EMPLOYER' | 'JOB_SEEKER';
export type CompanyVerificationStatus = 'NOT_REQUESTED' | 'PENDING' | 'VERIFIED' | 'REJECTED';

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

const test = {
  라벨: 'LABEL',
  아이템: 'ITEM',
} as const;

type TestValueType = keyof typeof test;

export type ResumeType = 'FILE' | 'GENERAL'; //파일, 일반
export type CareerLevel = keyof typeof careerLevel;
export type EducationLevelKeys = keyof typeof educationLevel;
export type Job = keyof typeof job;
export type Position = keyof typeof position;
export type City = keyof typeof city;
export type SalaryType = keyof typeof salaryType;
export type LicenseStageKeys = keyof typeof licenseStage;
export type experienceConditionKeys = keyof typeof experienceCondition;
export type RecruitmentStatusKeys = keyof typeof recruitmentStatus;

// type CareerLevelType = typeof careerLevel[keyof typeof careerLevel];

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
  job?: Job | undefined; //직무
  position?: Position; //직급/직책
  startDate: Date;
  endDate: Date;
  // city: City;
  salaryType?: SalaryType | undefined; //급여 유형
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
  careerLevel: CareerLevel;
  title: string;
  summary: string;
  education: EducationLevelKeys;
  // isGraduated: boolean; //졸업여부
  experiences: Experience[];
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
    experienceCondition: experienceConditionKeys;
    recruitmentCapacity: number;
    educationCondition: 'NOT_REQUIRED' | EducationLevelKeys;
    nationality: {
      korean: boolean;
      foreigner: boolean;
      marriageVisa?: string;
    };
  };
}

export interface RecruitmentDetail {
  id: string;
  recruitmentTitle: string;
  recruitmentStatus: RecruitmentStatusKeys;
  recruitmentInfo: {
    experienceCondition: experienceConditionKeys;
    recruitmentCapacity: number;
    educationCondition: 'NOT_REQUIRED' | EducationLevelKeys;
    nationality: {
      korean: boolean;
      foreigner: boolean;
      marriageVisa?: string;
    };
  };
  updateAt: Date;
}

export interface RecruitmentDetailForm extends Omit<RecruitmentDetail, 'id' | 'updateAt'> {}

// export interface RecruitmentDetailForm {
//   recruitmentTitle: string;
//   recruitmentStatus: RecruitmentStatusKeys;
//   recruitmentInfo: {
//     experienceCondition: experienceConditionKeys;
//     recruitmentCapacity: number;
//     educationCondition: 'NOT_REQUIRED' | EducationLevelKeys;
//     nationality: {
//       korean: boolean;
//       foreigner: boolean;
//       marriageVisa?: string;
//     };
//   };
// }

export interface DraftRecruitmentForm extends RecruitmentDetailForm {}

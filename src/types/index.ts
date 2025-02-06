import * as API from '@/types/API';
import { CAREER_LEVEL, LICENSE_STAGE } from '@/constants/resume';
import { EXPERIENCE_CONDITION, RECRUITMENT_STATUS, WORKING_DAY_LIST } from '@/constants/recruitment';
import { AllJobsKeyValuesKeys } from '@/constants/job';
import { EDUCATION_LEVEL, POSITION, SALARY_TYPE } from '@/constants';
import { CITY } from '@/constants/location';
import { BENEFITS } from '@/constants/benefits';
import { PREFERENCES } from '@/constants/preferences';
import { LANGUAGE_LEVEL, LANGUAGE } from '@/constants/language';
import { RESUME_STATUS, SANCTION_REASON } from '@/constants/resume';
import { APPLICATION_STATUS, EMPLOYER_REVIEW_STAGE_STATUS, REVIEW_STAGE_STATUS } from '@/constants/application';
import { RECRUITMENT_PRODUCT_NAME, RECRUITMENT_PRODUCT_OPTION_NAME, RECRUITMENT_PRODUCT_TYPE } from '@/constants/product';

export type Provider = 'LOCAL' | 'KAKAO' | 'GOOGLE';
export type RoleType = 'ADMIN' | 'EMPLOYER' | 'JOB_SEEKER';
export type CompanyVerificationStatus = 'NOT_REQUESTED' | 'PENDING' | 'VERIFIED' | 'REJECTED';
export type EmploymentType = 'FULL_TIME' | 'CONTRACT' | 'DAILY_WORKER' | 'INTERN';
export type CertificationStatus = 'PENDING' | 'VERIFIED' | 'REJECTED' | 'UNVERIFIED';
export type ApplicationStatus = 'APPLIED' | 'CANCELED' | 'ACCEPTED' | 'REJECTED';
export type RecruitmentName = 'PREMIUM' | 'SPECIAL' | 'URGENT' | 'BASIC';
export type AccountStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'BLOCKED'
  | 'SUSPENDED'
  | 'LOCKED'
  | 'DEACTIVATED'
  | 'PENDING'
  | 'RECOVERY'
  | 'ANONYMIZED'
  | 'WAITING_APPROVAL';

export type ResumeType = 'FILE' | 'GENERAL'; //파일, 일반
export type CareerLevelKeys = keyof typeof CAREER_LEVEL;
export type EducationLevelKeys = keyof typeof EDUCATION_LEVEL;
export type PositionKeys = keyof typeof POSITION;
export type CityKeys = keyof typeof CITY;
export type SalaryTypeKeys = keyof typeof SALARY_TYPE;
export type LicenseStageKeys = keyof typeof LICENSE_STAGE;
export type experienceConditionKeys = keyof typeof EXPERIENCE_CONDITION;
export type RecruitmentStatusKeys = keyof typeof RECRUITMENT_STATUS;
export type WorkingDayListKeys = keyof typeof WORKING_DAY_LIST;
export type BenefitsKeys = keyof typeof BENEFITS;
export type PreferencesKeys = keyof typeof PREFERENCES;
export type LanguageKey = keyof typeof LANGUAGE;
export type LanguageLevelKey = keyof typeof LANGUAGE_LEVEL;
export type ResumeStatusKey = keyof typeof RESUME_STATUS;
export type SanctionReasonKey = keyof typeof SANCTION_REASON;
export type ApplicationStatusKey = keyof typeof APPLICATION_STATUS;
export type ReviewStageStatusKey = keyof typeof REVIEW_STAGE_STATUS;
export type EmployerReviewStageStatusKey = keyof typeof EMPLOYER_REVIEW_STAGE_STATUS;
export type RecruitmentProductNameKey = keyof typeof RECRUITMENT_PRODUCT_NAME;
export type RecruitmentProductOptionNameKey = keyof typeof RECRUITMENT_PRODUCT_OPTION_NAME;
export type RecruitmentProductTypeKey = keyof typeof RECRUITMENT_PRODUCT_TYPE;

export type TalentListItem = {};

export type RecruitmentItem = {
  id: string;
  recruitmentTitle: string;
  recruitmentStatus: RecruitmentStatusKeys;
  applicationCount: { totalCount: number; viewCount: number; notViewCount: number };
  jobs: AllJobsKeyValuesKeys[];
  createdAt: Date;
  updatedAt: Date;
};

export type Experience = {
  companyName: string;
  isEmployed: boolean; //재직중
  responsibility: string; //담당업무
  job: AllJobsKeyValuesKeys; //직무
  position: PositionKeys | null; //직급/직책
  startDate: Date;
  endDate: Date | null;
  reasonForLeaving: string; //퇴사사유
};

export type License = {
  licenseName: string;
  licenseStage: LicenseStageKeys;
};

export type Military = {};

export interface SignInForm extends API.SignInRequest {}

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

export interface ApplicantProfile {
  accountStatus: AccountStatus;
  certification: null;
  certificationStatus: CertificationStatus;
  consent: {
    ageAgree: boolean;
    personalInfoAgree: boolean;
    serviceTermsAgree: boolean;

    emailMarketingAgree: boolean;
    smsMarketingAgree: boolean;
  };
  email: string;
  nickname: string;
  provider: Provider;
  createdAt: string;
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

export interface ResumeLstItemApplications {
  id: string;
  applicationStatus: ApplicationStatus;
  createdAt: Date;
  applyAt: Date;
  cancelAt: Date | null;
  reviewStageStatus: ReviewStageStatusKey;
  recruitment: {
    id: string;
    recruitmentTitle: string;
    hotelName: string;
  };
}
export interface ResumeListItem {
  id: string;
  title: string;
  isVisible: boolean;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  status: ResumeStatusKey;
  sanctionReason: SanctionReasonKey;
  applicationsCount: number;
  applications: ResumeLstItemApplications[];
}

export interface ResumeRegisterForm {
  resumeType: ResumeType;
  careerLevel: CareerLevelKeys;
  title: string;
  profileImage: string;
  name: string;
  localCode: '01' | '02'; //내국인, 외국인
  sexCode: '01' | '02';
  phone: string;
  birthday: string;
  summary: string;
  address: string;
  addressDetail: string;
  education: EducationLevelKeys;
  // isGraduated: boolean; //졸업여부
  // experience: Experience[];

  languages: { name: LanguageKey | null; level: LanguageLevelKey | null }[];

  // introduction: string; //자기소개
  licenses: License[];
  // military: Military;
  isRequiredAgreement: boolean;
  isOptionalAgreement: boolean;
}

export interface ResumeDetail {
  id: string;
  status: ResumeStatusKey;
  resumeType: ResumeType;
  careerLevel: CareerLevelKeys;
  title: string;
  profileImage: string;
  name: string;
  localCode: '01' | '02'; //내국인, 외국인
  sexCode: '01' | '02';
  phone: string;
  birthday: string;
  email: string;
  summary: string;
  address: string;
  addressDetail: string;
  education: EducationLevelKeys;
  // isGraduated: boolean; //졸업여부
  experience: Experience[];
  languages: { name: LanguageKey; level: LanguageLevelKey }[];
  // introduction: string; //자기소개
  licenses: License[];
  // military: Military;
  isRequiredAgreement: boolean;
  isOptionalAgreement: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResumeDetailForm extends Omit<ResumeDetail, 'id' | 'createdAt' | 'updatedAt' | 'status'> {}

export interface ApplicationHistory {
  id: number;
  reviewStageStatus: ReviewStageStatusKey;
  applicationStatus: ApplicationStatusKey;
  recruitment: {
    id: string;
    title: string;
    hotelName: string;
    recruitmentStatus: RecruitmentStatusKeys;
  };
  resume: {
    title: string;
    isDefault: string;
  };
  isView: boolean;
  viewAt: Date | null;
  rejectAt: Date | null;
  acceptAt: Date | null;
  applyAt: Date | null;
  cancelAt: Date | null;
  createdAt: Date | null;
}

export interface RecruitmentDetailApplicantListItem {
  id: number;
  applicationStatus: ApplicationStatusKey;
  reviewStageStatus: ReviewStageStatusKey;
  employerReviewStageStatus: EmployerReviewStageStatusKey;
  isView: boolean;
  applyAt: Date | null;
  cancelAt: Date | null;
  rejectAt: Date | null;
  acceptAt: Date | null;
  createdAt: Date | null;
  viewAt: Date | null;
  resume: {
    // resume: 이력서 삭제 시 null
  };
  resumeSnapshot: ResumeDetail;
}

export interface GetPublishedRecruitmentListItem {
  id: string;
  recruitmentTitle: string;
  recruitmentStatus: RecruitmentStatusKeys;
  jobs: AllJobsKeyValuesKeys[];
}

export type ProductDuration = {
  bonusDays: number;
  discountRate: number;
  duration: number;
  id: string;
  price: number;
};

export interface ProductRecruitmentListItem {
  id: string;
  type: 'MAIN' | 'RECRUIT';
  name: RecruitmentProductNameKey;
  durations: ProductDuration[];
  options: {
    id: string;
    listUpIntervalHours: number;
    maxListUpPerDay: number;
    name: RecruitmentProductOptionNameKey;
    tags: [];
    optionDurations: ProductDuration[];
  }[];
}

export type PaymentRecruitmentDetailAmountInfo = {
  couponDiscountAmount: number;
  membershipDiscountAmount: number;
  originalAmount: number;
  productDiscountAmount: number;
  totalDiscountAmount: number;
  finalTotalAmount: number;
};

export type ProductInfoItem = {
  bonusDays: number;
  discountRate: number;
  duration: number;
  id: string;
  name: RecruitmentName;
  type: RecruitmentProductTypeKey;
  options: {
    bonusDays: number;
    price: number;
    discountRate: number;
    duration: number;
    id: string;
    name: RecruitmentProductOptionNameKey;
  }[];
  price: number;
};

export type PaymentRecruitmentInfo = {
  id: string;
  recruitmentTitle: string;
  jobs: AllJobsKeyValuesKeys[];
  createdAt: Date;
};

export interface PaymentRecruitmentDetail {
  orderId: string;
  paymentStatus: 'PAYMENT_PENDING';
  expiresAt: string;
  certificationInfo: {
    phone: string;
    userName: string;
    managerEmail: string;
  };
  amountInfo: PaymentRecruitmentDetailAmountInfo;
  productInfo: ProductInfoItem;
  recruitmentInfo: PaymentRecruitmentInfo;
}

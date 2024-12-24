import * as API from '@/types/API';
import { educationLevel, careerLevel, job, position, salaryType, licenseStage } from '@/constants/resume';
import { city } from '@/constants/location';

export type ProviderType = 'local' | 'kakao';
export type RoleType = 'ADMIN' | 'EMPLOYER' | 'JOB_SEEKER';
export type ResumeType = 'FILE' | 'GENERAL'; //파일, 일반
export type CareerLevel = keyof typeof careerLevel;
export type EducationLevel = keyof typeof educationLevel;
export type Job = keyof typeof job;
export type Position = keyof typeof position;
export type City = keyof typeof city;
export type SalaryType = keyof typeof salaryType;
export type LicenseStage = keyof typeof licenseStage;

// type CareerLevelType = typeof careerLevel[keyof typeof careerLevel];

export type TalentListItem = {};

export type Experience = {
  companyName: string;
  isEmployed: boolean; //재직중
  responsibility: string; //담당업무
  job?: Job | undefined; //직무
  position: Position; //직급/직책
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
  licenseStage?: LicenseStage | undefined;
  dateOfCompletion: Date;
};

export type Military = {};

export interface defaultResponse {
  success: boolean;
  message: string;
}

export interface SignInForm extends API.SignInRequest {}

export interface ResumeRegisterForm {
  resumeType: ResumeType;
  careerLevel: CareerLevel;
  title: string;
  summary: string;
  education: EducationLevel;
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
}

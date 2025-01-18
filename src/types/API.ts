import { AllJobsKeyValuesKeys } from '@/constants/job';
import * as types from '@/types';

type ResponseStatus = 'success' | 'duplicate' | 'available' | 'failure' | 'available';

// query
export type RecruitmentQueryStatus = 'ALL' | 'PROGRESS' | 'PUBLISHED' | 'CLOSED' | 'REVIEWING' | 'DRAFT';
export type RecruitmentApplicantQueryStep = 'ALL' | 'DOCUMENT' | 'INTERVIEW' | 'ACCEPTED' | 'REJECTED';
export type RecruitTypeQuery = 'special' | 'urgent' | 'basic';

export interface BaseResponse {
  error: { message: string; code: number } | null;
  success: boolean;
  timestamp: Date;
}

export interface PaginationInfo {
  itemCount: number;
  itemsPerPage: number;

  totalItems: number;
  totalPages: number;

  nextPage: number | null;
  prevPage: number | null;
  currentPage: number;
}

export interface DefaultRecruitQuery {
  page: string;
  limit: string;
  experience?: types.experienceConditionKeys;
  employment?: types.EmploymentType[];
  benefits?: types.BenefitsKeys[];
  jobs?: AllJobsKeyValuesKeys[];
}

/************************************* REQUEST **************************************/

export interface SignInRequest {
  userId: string;
  password: string;
}

export interface OAuthSignInRequest extends types.OAuthSignInForm {}

export interface GetRecruitSpecialListRequest extends DefaultRecruitQuery {}

export interface GetRecruitUrgentListRequest extends DefaultRecruitQuery {}

export interface GetRecruitBasicListRequest extends DefaultRecruitQuery {}

export interface GetTalentListRequest {
  page: string;
  limit: string;
}

export interface RecruitmentListRequest {
  page: string;
  limit: string;
  status: RecruitmentQueryStatus;
}

export interface ResumeRegisterRequest extends types.ResumeRegisterForm {}

export interface SetupCompanyRequest extends types.SetupCompanyForm {}

export interface SignUpEmployerRequest extends Omit<types.SignUpForm, 'userIdAvailableState' | 'passwordConfirm'> {}

export interface CreateRecruitmentRequest extends types.CreateRecruitmentForm {
  id?: string;
}

export interface UpdateRecruitmentRequest extends types.CreateRecruitmentForm {
  id: string;
}

export interface DraftRecruitmentRequest extends Partial<types.CreateRecruitmentForm> {
  id?: string;
}

export interface ApplyResumeRequest {
  resumeId: string;
  recruitId: string;
}

/************************************* RESPONSE **************************************/

export interface SignInResponse extends BaseResponse {
  result: {
    accessToken: string;
    role: types.RoleType;
    provider: types.ProviderType;
  };
}

export interface OAuthSignInResponse extends BaseResponse {
  result: {
    accessToken: string;
    provider: types.ProviderType;
    role: types.RoleType;
    nickname: string; //new
    accountStatus: types.AccountStatusType; //new
    certificationStatus: types.CertificationStatus; //new
  };
}

export interface RequestAccessTokenResponse extends BaseResponse {
  result: {
    accessToken: string;
  };
}

export interface GetUserInfoResponse extends BaseResponse {
  result: {
    nickname: string;
    accessToken: string;
    provider: types.ProviderType;
    role: types.RoleType;
    accountStatus: types.AccountStatusType;
    companyVerificationStatus: types.CompanyVerificationStatus;
    certificationStatus: types.CertificationStatus;
  };
}

export interface GetTalentListResponse extends BaseResponse {
  result: {
    items: types.TalentListItem[];
    pagination: PaginationInfo;
  };
}

export interface SetupCompanyResponse extends BaseResponse {
  result: {
    status: ResponseStatus;
  };
}

export interface verificationsEmployerUserIdResponse extends BaseResponse {
  result: {
    status: ResponseStatus;
  };
}

export interface verificationsBusinessNumberCheckResponse extends BaseResponse {
  result: {
    status: ResponseStatus;
  };
}

export interface SignUpEmployerResponse extends BaseResponse {
  result: {
    status: ResponseStatus;
  };
}

export interface CertificationStartResponse extends BaseResponse {
  result: {
    status: ResponseStatus;
    params: Record<string, string>;
  };
}

export interface GetMyCompanyResponse extends BaseResponse {
  result: types.EmployerBusinessForm;
}

export interface CreateRecruitmentResponse extends BaseResponse {}

export interface DraftRecruitmentResponse extends BaseResponse {}

export interface RecruitmentListResponse extends BaseResponse {
  result: {
    items: types.RecruitmentItem[];
    pagination: PaginationInfo;
  };
}

//임시저장 응답값
export interface DraftRecruitmentResponse extends BaseResponse {
  result: {
    status: ResponseStatus;
    id: string;
  };
}

export interface RecruitmentDetailResponse extends BaseResponse {
  result: types.RecruitmentDetail;
}

export interface RecruitmentStatusCountResponse extends BaseResponse {
  result: {
    ALL: number;
    PROGRESS: number;
    PUBLISHED: number;
    CLOSED: number;
    REVIEWING: number;
    DRAFT: number;
  };
}

export interface CreateRecruitmentResponse extends BaseResponse {
  result: {
    status: ResponseStatus;
  };
}

export interface UpdateRecruitmentResponse extends BaseResponse {
  result: {
    status: ResponseStatus;
  };
}

export interface RemoveRecruitmentResponse extends BaseResponse {
  result: {
    status: ResponseStatus;
  };
}

export interface GetRecruitSpecialListResponse extends BaseResponse {
  result: {
    items: types.RecruitListItem[];
    pagination: PaginationInfo;
  };
}

export interface GetRecruitUgentListResponse extends BaseResponse {
  result: {
    items: types.RecruitListItem[];
    pagination: PaginationInfo;
  };
}

export interface GetRecruitBasicListResponse extends BaseResponse {
  result: {
    items: types.RecruitListItem[];
    pagination: PaginationInfo;
  };
}

export interface RecruitDetailResponse extends BaseResponse {
  result: types.IRecruitDetail;
}

export interface CreateResumeResponse extends BaseResponse {
  result: {
    status: ResponseStatus;
    id: string;
  };
}

export interface GetResumeEditResponse extends BaseResponse {
  result: {
    id: string;
  };
}

export interface GetResumeDetailResponse extends BaseResponse {
  result: types.ResumeDetail;
}

export interface GetResumeListResponse extends BaseResponse {
  result: types.ResumeListItem[];
}

export interface GetAvailableResumeList extends BaseResponse {
  result: types.ResumeListItem[];
}

export interface ApplicationApplyCheckResponse extends BaseResponse {
  result: {
    status: ResponseStatus;
  };
}
export interface DeleteResumeResponse extends BaseResponse {
  result: {
    status: ResponseStatus;
  };
}

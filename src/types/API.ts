import { AllJobsKeyValuesKeys } from '@/constants/job';
import * as types from '@/types';

type ResponseStatus = 'success' | 'duplicate' | 'available' | 'failure' | 'available';

// query
export type RecruitmentQueryStatus = 'ALL' | 'PROGRESS' | 'PUBLISHED' | 'CLOSED' | 'REVIEWING' | 'DRAFT';
export type RecruitmentApplicantQueryStep = 'DOCUMENT' | 'INTERVIEW' | 'ACCEPT' | 'REJECTED';
export type RecruitTypeQuery = 'special' | 'urgent' | 'basic';
export type ProductRecruitmentQuery = 'MAIN' | 'RECRUIT';

export interface BaseResponse {
  error: { message: string; code: string } | null;
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
  type: ProductRecruitmentQuery;
  experience?: types.experienceConditionKeys;
  employment?: types.EmploymentType[];
  benefits?: types.BenefitsKeys[];
  job?: AllJobsKeyValuesKeys | AllJobsKeyValuesKeys[];
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

export interface GetRecruitmentDetailApplicantListRequest {
  recruitmentId: string;
  step?: RecruitmentApplicantQueryStep;
}

export interface UpdateEmployerReviewStageStatusRequest {
  applicationId: number;
  stage: types.EmployerReviewStageStatusKey;
}

export interface SaveFcmTokenRequest {
  token: string;
  isPWA: boolean;
}

export interface PaymentRecruitmentConfirmRequest {
  orderId: string;
  paymentKey: string;
  amount: number; // XXX
}

export interface PaymentRecruitmentFreeConfirmRequest extends Pick<PaymentRecruitmentConfirmRequest, 'orderId' | 'amount'> {}

export interface CreateApplicationsAnnouncementRequest extends types.CreateApplicationsAnnouncementForm {}

/************************************* RESPONSE **************************************/

export interface SignInResponse extends BaseResponse {
  result: {
    accessToken: string;
    role: types.RoleType;
    provider: types.Provider;
    nickname: string; //new
    accountStatus: types.AccountStatus; //new
    certificationStatus: types.CertificationStatus; //new
  };
}

export interface OAuthSignInResponse extends BaseResponse {
  result: {
    accessToken: string;
    provider: types.Provider;
    role: types.RoleType;
    nickname: string; //new
    accountStatus: types.AccountStatus; //new
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
    provider: types.Provider;
    role: types.RoleType;
    accountStatus: types.AccountStatus;
    companyVerificationStatus: types.CompanyVerificationStatus;
    certificationStatus: types.CertificationStatus;
  };
}

export interface GetApplicantProfileResponse extends BaseResponse {
  result: types.ApplicantProfile;
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

export interface RecruitmentApplicationStatusCountResponse {
  result: {
    TOTAL: number;
    DOCUMENT: number;
    INTERVIEW: number;
    ACCEPT: number;
    REJECT: number;
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

export interface UpdateApplicationResumeView extends BaseResponse {
  result: {
    status: ResponseStatus;
  };
}

export interface UpdateEmployerReviewStageStatusResponse extends BaseResponse {
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

export interface GetApplicationHistoryResponse extends BaseResponse {
  result: types.ApplicationHistory[];
}

export interface DeactivateApplicantUserResponse extends BaseResponse {
  result: {
    status: ResponseStatus;
  };
}

export interface GetRecruitmentDetailApplicantListResponse extends BaseResponse {
  result: types.RecruitmentDetailApplicantListItem[];
}
export interface GetPublishedRecruitmentListResponse extends BaseResponse {
  result: types.GetPublishedRecruitmentListItem[];
}

export interface GetProductRecruitmentList extends BaseResponse {
  result: types.ProductRecruitmentListItem[];
}

export interface UploadProfileImageResponse extends BaseResponse {
  result: {
    status: string;
    key: string;
  };
}
export interface SaveFcmTokenResponse extends BaseResponse {
  result: {
    status: ResponseStatus;
  };
}

export interface PaymentRecruitmentInitiateResponse extends BaseResponse {
  result: {
    status: ResponseStatus;
    orderId: string;
  };
}

export interface GetPaymentRecruitmentDetailResponse extends BaseResponse {
  result: types.PaymentRecruitmentDetail;
}

export interface PaymentRecruitmentConfirmResponse extends BaseResponse {
  result: types.PaymentRecruitmentConfirmData;
}

export interface GetRecruitmentDetailApplicationCountResponse extends BaseResponse {
  result: types.RecruitmentDetailApplicationCount;
}

export interface GetEmployerPaymentListResponse extends BaseResponse {
  result: types.EmployerPaymentItem[];
}

export interface EmployerAccountInfoResponse extends BaseResponse {
  result: types.EmployerAccountInfo;
}

export interface GetEmployerCouponList extends BaseResponse {
  result: types.EmployerCouponListItem[];
}

export interface AvailableCouponListResponse extends BaseResponse {
  result: types.AvailableCouponList;
}

export interface ApplyCouponResponse extends BaseResponse {
  result: {
    status: ResponseStatus;
  };
}

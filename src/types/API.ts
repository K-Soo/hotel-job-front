import * as types from '@/types';

type ResponseStatus = 'success' | 'duplicate';
export interface defaultResponse {
  error: {
    message: string;
    code: number;
  } | null;
  success: boolean;
  timestamp: Date;
}

export interface Meta {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

/************************************* HTTP REQUEST **************************************/

export interface SignInRequest {
  userId: string;
  password: string;
}

export interface OAuthSignInRequest {
  code: string;
  isInitialRequest: 'Y' | 'N';
}

export interface GetTalentListRequest {
  page: string;
  limit: string;
}

export interface ResumeRegisterRequest extends types.ResumeRegisterForm {}

export interface SetupCompanyRequest extends types.SetupCompanyForm {}

/************************************* HTTP RESPONSE **************************************/

export interface SignInResponse extends defaultResponse {
  result: {
    accessToken: string;
    role: types.RoleType;
    provider: types.ProviderType;
  };
}

export interface OAuthSignInResponse extends defaultResponse {
  result: {
    accessToken: string;
    provider: types.ProviderType;
    role: types.RoleType;
  };
}

export interface RequestAccessTokenResponse extends defaultResponse {
  result: {
    accessToken: string;
  };
}

export interface GetUserInfoResponse extends defaultResponse {
  result: {
    nickname: string;
    accessToken: string;
    provider: types.ProviderType;
    role: types.RoleType;
    accountStatus: types.AccountStatusType;
    companyVerificationStatus: types.CompanyVerificationStatus;
  };
}

export interface GetTalentListResponse extends defaultResponse {
  result: {
    items: types.TalentListItem[];
    meta: Meta;
  };
}

export interface SetupCompanyResponse extends defaultResponse {
  result: {
    status: ResponseStatus;
  };
}

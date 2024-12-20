import * as types from '@/types';
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
    accessToken: string;
    provider: types.ProviderType;
    role: types.RoleType;
  };
}

export interface GetTalentListResponse extends defaultResponse {
  result: {
    items: types.TalentListItem[];
    meta: Meta;
  };
}

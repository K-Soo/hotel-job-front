import * as types from "@/types";
export interface defaultResponse {
  error: {
    message: string;
    code: number;
  } | null;
  success: boolean;
  timestamp: Date;
}

/************************************* HTTP REQUEST **************************************/

export interface SignInRequest {
  userId: string;
  password: string;
}

/************************************* HTTP RESPONSE **************************************/

export interface SignInResponse extends defaultResponse {
  result: {
    accessToken: string;
    nickname: string;
    provider: string;
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

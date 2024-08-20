export interface defaultResponse {
  status: number;
}

/************************************* HTTP REQUEST **************************************/

export interface SignInRequest {
  username: string;
  password: string;
}

/************************************* HTTP RESPONSE **************************************/

export interface SignInResponse extends defaultResponse {
  result: {
    accessToken: string;
    email: string;
    provider: string;
  };
}

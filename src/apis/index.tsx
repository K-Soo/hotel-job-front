import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { interceptorHelper } from "./interceptorHelper";
import environment from "@/environment";
import * as API from "@/types/API";
import { BehaviorSubject } from "rxjs";

const URL_API = "/api";
const VERSION = "/v1";

const config: AxiosRequestConfig = {
  baseURL: environment.apiUrl + URL_API + VERSION,
  withCredentials: true,
};

export const instance = axios.create(config);

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (config) => {
    interceptorHelper.handleSuccessResponse(config);
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    const responseData = error.response.data;

    // access token 만료 or 누락
    const shouldRefreshToken = responseData?.error?.code === "ERR-1000" || responseData?.error?.code === "ERR-1001";
    console.log("shouldRefreshToken: ", shouldRefreshToken);

    // access token 위조
    // refresh token 만료 or 누락 or 위조
    const shouldLogoutUser =
      responseData?.error?.code === "ERR-1020" ||
      responseData?.error?.code === "ERR-1021" ||
      responseData?.error?.code === "ERR-1022" ||
      responseData?.error?.code === "ERR-1002";

    // if (shouldRefreshToken && !originalRequest._retry) {
    if (shouldRefreshToken) {
      originalRequest._retry = true;
      return interceptorHelper.handleRequestAccessToken(originalRequest);
    }

    if (shouldLogoutUser) {
      return interceptorHelper.handleInvalidRefreshToken();
    }

    return Promise.reject(error);
  }
);

const responseBody = <T extends {}>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: (url: string) => instance.get(url, config).then(responseBody),
  post: <T extends {}>(url: string, body: object) => instance.post<T>(url, body).then(responseBody),
};

export const Internal = {
  checkRefreshCookie: (): Promise<{ result: boolean }> => axios.get("/api/internal/check-cookies").then(responseBody),
};

export const OAuth = {
  // 카카오 로그인
  kakaoSignIn: (body: { code: string; isInitialRequest: boolean }) => requests.post<API.OAuthSignInResponse>("/oauth/kakao", body),
};

export const Get = {
  getTests: () => requests.get("/tests"),

  getUserInfo: () => requests.get("/auth/user-info"),

  getAccessTokenUpdate: () => requests.get("/auth/refresh"),

  signOut: () => requests.get("/auth/sign-out"),

  getAccount: () => requests.get("/account"),

  getBusinessUser: () => requests.get("/business-user"),
};

export const Post = {
  // 사업자 로그인
  signIn: (body: API.SignInRequest) => requests.post<API.SignInResponse>("/auth/sign-in", body),

  // 유저정보
  getUserInfo: (body: {}) => requests.post<API.GetUserInfoResponse>("/auth/me", body),

  // 엑세스토큰 재요청
  requestAccessToken: (body: {}) => requests.post<API.RequestAccessTokenResponse>("/auth/refresh", body),
};

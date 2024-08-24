import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { interceptorHelper } from "./interceptorHelper";
import environment from "@/environment";
import * as API from "@/types/API";
import { BehaviorSubject } from "rxjs";

const URL_API = "/api";

const config: AxiosRequestConfig = {
  baseURL: environment.apiUrl + URL_API,
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

export const userData$ = new BehaviorSubject<any>(null);

instance.interceptors.response.use(
  (config) => {
    interceptorHelper.handleSuccessResponse(config);
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    console.error("response interceptor : ", error.response?.data);

    const shouldRefreshToken = error.response.status === 401;
    const shouldLogoutUser = error.response.status === 403;

    // if (shouldRefreshToken && !originalRequest._retry) {
    if (shouldRefreshToken) {
      // originalRequest._retry = true;
      interceptorHelper.handleRequestAccessToken(originalRequest);
    }

    if (shouldLogoutUser) {
      interceptorHelper.handleInvalidRefreshToken();
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
  //카카오 로그인
  kakaoSignIn: (body: { code: string }) => requests.post<{ success: string }>("/auth/kakao", body),
};

export const Get = {
  getUserInfo: () => requests.get("/auth/user-info"),

  getAccount: () => requests.get("/account"),

  getAccessTokenUpdate: () => requests.get("/auth/refresh-token"),

  getBusinessUser: () => requests.get("/business-user"),
};

export const Post = {
  signIn: (body: API.SignInRequest) => requests.post<API.SignInResponse>("/auth/sign-in", body),

  getUserInfo: (body: {}) => requests.post<API.GetUserInfoResponse>("/auth/user-info", body),

  requestAccessToken: (body: {}) => requests.post<API.RequestAccessTokenResponse>("/auth/refresh-token", body),
};

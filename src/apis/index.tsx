import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { interceptorHelper } from "./interceptorHelper";
import environment from "@/environment";
import * as API from "@/types/API";

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

    let isRefreshing = false;

    // if (shouldRefreshToken && !originalRequest._retry) {
    if (shouldRefreshToken) {
      // originalRequest._retry = true;

      try {
        const response = await Post.requestAccessToken({});
        console.log("토큰 재요청 API : ", response);
        if (response.status !== 200) {
          throw new Error();
        }
        const newAccessToken = response.result.accessToken;
        instance.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("refresh-token error : ", error.response?.data);
        }
      }
    }

    // // 엑세스 토큰 재요청
    // if (shouldRefreshToken && !isRefreshing) {
    //   isRefreshing = true;
    //   return interceptorHelper.handleTokenExpiredError(originalRequest, error);
    // }

    if (shouldLogoutUser) {
      alert("만료되었습니다.");
      window.location.href = "/sign-in";
    }

    // // 리프레시 토큰 만료
    // if (shouldLogoutUser && !isRefreshing) {
    //   isRefreshing = true;
    //   return interceptorHelper.handleCookieMissingError();
    // }

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
  getUserInfo: (body: {}) => requests.post("/auth/user-info", body),

  requestAccessToken: (body: {}) => requests.post<API.RequestAccessTokenResponse>("/auth/refresh-token", body),
};

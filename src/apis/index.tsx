import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { interceptorHelper } from "./interceptorHelper";
import environment from "@/environment";

const URL_API = "/api";

const config: AxiosRequestConfig = {
  baseURL: environment.apiUrl + URL_API,
  withCredentials: true,
};

export const instance = axios.create(config);

instance.interceptors.request.use(
  (config) => {
    console.log("시작시작시작시작시작시작시작시작시작: ", config);

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
    console.log("interceptors -  ", error);

    const { config, response } = error;
    const originalRequest = config;
    const shouldRefreshToken = response?.status === 401;
    const shouldLogoutUser = response?.status === 403;

    let isRefreshing = false;

    // // 엑세스 토큰 재요청
    // if (shouldRefreshToken && !isRefreshing) {
    //   isRefreshing = true;
    //   return interceptorHelper.handleTokenExpiredError(originalRequest, error);
    // }

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

export const OAuth = {
  //카카오 로그인
  kakaoSignIn: (body: { code: string }) => requests.post<{ success: string }>("/auth/kakao", body),
};

export const Get = {
  getUserInfo: () => requests.get("/auth/user-info"),
};

export const Post = {
  signIn: (body: { username: string; password: string }) => requests.post("/auth/sign-in", body),
};

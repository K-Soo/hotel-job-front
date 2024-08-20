import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import environment from "@/environment";

const URL_API = "/api";

const config: AxiosRequestConfig = {
  baseURL: environment.apiUrl + URL_API,
  withCredentials: true,
};

export const instance = axios.create(config);

const responseBody = <T extends {}>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: (url: string) => instance.get(url, config).then(responseBody),
  post: <T extends {}>(url: string, body: object) => instance.post<T>(url, body).then(responseBody),
};

export const OAuth = {
  //카카오 로그인
  kakaoSignIn: (body: { code: string }) => requests.post<{ success: string }>("/auth/kakao", body),
};

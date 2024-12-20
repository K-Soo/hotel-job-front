import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { interceptorHelper } from './interceptorHelper';
import environment from '@/environment';
import * as API from '@/types/API';

const URL_API = '/api';
const VERSION = '/v1';

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
  },
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
    const shouldRefreshToken = responseData?.error?.code === 'ERR-1000' || responseData?.error?.code === 'ERR-1001';
    console.log('shouldRefreshToken: ', shouldRefreshToken);

    // access token 위조
    // refresh token 만료 or 누락 or 위조
    const shouldLogoutUser =
      responseData?.error?.code === 'ERR-1020' ||
      responseData?.error?.code === 'ERR-1021' ||
      responseData?.error?.code === 'ERR-1022' ||
      responseData?.error?.code === 'ERR-1002';

    // if (shouldRefreshToken && !originalRequest._retry) {
    if (shouldRefreshToken) {
      originalRequest._retry = true;
      return interceptorHelper.handleRequestAccessToken(originalRequest);
    }

    if (shouldLogoutUser) {
      return interceptorHelper.handleInvalidRefreshToken();
    }

    return Promise.reject(error);
  },
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <Response>(url: string) => instance.get<Response>(url, config).then(responseBody),
  post: <Request, Response>(url: string, body: Request) => instance.post<Response>(url, body).then(responseBody),
};

export const Internal = {
  checkRefreshCookie: (): Promise<{ result: boolean }> => axios.get('/api/internal/check-cookies').then(responseBody),
};

export const OAuth = {
  // 카카오 로그인
  kakaoSignIn: (body: API.OAuthSignInRequest) => requests.post<API.OAuthSignInRequest, API.OAuthSignInResponse>('/oauth/kakao', body),
};

export const Get = {
  getTests: () => requests.get('/tests'),

  getUserInfo: () => requests.get('/auth/user-info'),

  getAccessTokenUpdate: () => requests.get('/auth/refresh'),

  getAccount: () => requests.get('/account'),

  getBusinessUser: () => requests.get('/business-user'),

  // 인재풀 리스트
  getTalentList: ({ page, limit }: API.GetTalentListRequest) => {
    const params = new URLSearchParams();
    if (page) params.set('page', page);
    if (limit) params.set('limit', limit);

    const queryString = params.toString();
    const url = `/talents${queryString && `?${queryString}`}`;
    return requests.get<API.GetTalentListResponse>(url);
  },
};

export const Post = {
  // 사업자 로그인
  signIn: (body: API.SignInRequest) => requests.post<API.SignInRequest, API.SignInResponse>('/auth/sign-in', body),

  // 유저정보
  getUserInfo: (body: void) => requests.post<void, API.GetUserInfoResponse>('/auth/me', body),

  // 엑세스토큰 재요청
  requestAccessToken: (body: void) => requests.post<void, API.RequestAccessTokenResponse>('/auth/refresh', body),

  signOut: (body: void) => requests.post('/auth/sign-out', body),
};

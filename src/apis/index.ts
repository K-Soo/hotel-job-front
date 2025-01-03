import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { interceptorHelper } from './interceptorHelper';
import environment from '@/environment';
import * as API from '@/types/API';

const URL_API = '/api';
const VERSION = '/v1';

const config: AxiosRequestConfig = {
  baseURL: environment.apiUrl + URL_API + VERSION,
  withCredentials: true,
  // headers: {
  //   Origin: 'localhost:3000',
  // },
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

    // access token 위조
    // refresh token 만료 or 누락 or 위조
    const shouldLogoutUser =
      responseData?.error?.code === 'ERR-1020' ||
      responseData?.error?.code === 'ERR-1021' ||
      responseData?.error?.code === 'ERR-1022' ||
      responseData?.error?.code === 'ERR-1002';

    //소셜로그인 초기 로그인 요청을 했는데 서버에서 userId로 사용자를 찾을수없을때
    const notFoundUser = responseData?.error?.code === 'ERR-1030';

    if (shouldRefreshToken && !originalRequest._retry) {
      // if (shouldRefreshToken) {
      originalRequest._retry = true;
      return interceptorHelper.handleRequestAccessToken(originalRequest);
    }

    if (notFoundUser) {
      alert('고객센터에 문의해주세요.');
      Post.signOut();
      window.location.href = '/';
    }

    if (shouldLogoutUser) {
      return interceptorHelper.handleInvalidRefreshToken();
    }

    return Promise.reject(error);
  },
);

const responseBody = <T>(response: AxiosResponse<T>) => response?.data;

const requests = {
  get: <Response>(url: string) => instance.get<Response>(url, config).then(responseBody),
  post: <Request, Response>(url: string, body: Request, config?: AxiosRequestConfig) =>
    instance.post<Response>(url, body, config).then(responseBody),
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

  // 사업자 -  회사정보 가져오기
  getMyCompany: () => requests.get<any>('/employers/company'),
};

export const Post = {
  //아이디 중복확인
  verificationsEmployerUserId: (body: { userId: string }) =>
    requests.post<{ userId: string }, API.verificationsEmployerUserIdResponse>('/verifications/employer/user-id', body),

  // 사업자 로그인
  signIn: (body: API.SignInRequest) => requests.post<API.SignInRequest, API.SignInResponse>('/auth/sign-in', body),

  // 사업자 회원가입
  signUpEmployer: (body: API.SignUpEmployerRequest) =>
    requests.post<API.SignUpEmployerRequest, API.SignUpEmployerResponse>('/auth/sign-up', body),

  // 유저정보
  authMe: (body: {}, config?: AxiosRequestConfig) => requests.post<{}, API.GetUserInfoResponse>('/auth/me', body, config),

  // 엑세스토큰 재요청
  requestAccessToken: (body: {}, config?: AxiosRequestConfig) =>
    requests.post<{}, API.RequestAccessTokenResponse>('/auth/refresh', body, config),

  // 로그아웃
  signOut: (body: void) => requests.post('/auth/sign-out', body),

  // 초기 회사정보 등록
  setupCompany: (body: API.SetupCompanyRequest) =>
    requests.post<API.SetupCompanyRequest, API.SetupCompanyResponse>('/employers/company', body),
};

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
      Auth.signOut();
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
  patch: <Request, Response>(url: string, body: Request, config?: AxiosRequestConfig) =>
    instance.patch<Response>(url, body, config).then(responseBody),
};

export const Internal = {
  checkRefreshCookie: (): Promise<{ result: boolean }> => axios.get('/api/internal/check-cookies').then(responseBody),
};

export const Auth = {
  // 사업자 로그인
  signIn: (body: API.SignInRequest) => requests.post<API.SignInRequest, API.SignInResponse>('/auth/sign-in', body),

  // 사업자 회원가입
  signUpEmployer: (body: API.SignUpEmployerRequest) =>
    requests.post<API.SignUpEmployerRequest, API.SignUpEmployerResponse>('/auth/sign-up', body),

  // 유저정보
  me: (body: {}, config?: AxiosRequestConfig) => requests.post<{}, API.GetUserInfoResponse>('/auth/me', body, config),

  // 엑세스토큰 재요청
  requestAccessToken: (body: {}, config?: AxiosRequestConfig) =>
    requests.post<{}, API.RequestAccessTokenResponse>('/auth/refresh', body, config),

  // 로그아웃
  signOut: (body: void) => requests.post('/auth/sign-out', body),
};

export const OAuth = {
  // 카카오 로그인
  kakaoSignIn: (body: API.OAuthSignInRequest) => requests.post<API.OAuthSignInRequest, API.OAuthSignInResponse>('/oauth/kakao', body),
};

export const Get = {
  getTests: () => requests.get('/tests'),

  getHealth: () => requests.get('/health'),

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

  // 사업자 -  계정정보
  employerAccountInfo: () => requests.get<any>('/employers'),

  // 사업자 - 회사정보 가져오기
  employerCompany: () => requests.get<API.GetMyCompanyResponse>('/employers/company'),

  // 사업자 - 채용공고 상세정보
  recruitmentDetail: ({ id }: { id: string }) => requests.get<API.RecruitmentDetailResponse>(`/employers/recruitment/${id}`),

  // 사업자 - 채용공고 상태별 수량 집계
  recruitmentStatusCount: () => requests.get<API.RecruitmentStatusCountResponse>(`/employers/recruitment/status`),

  // TODO - 타입정의
  // 사업자 - 채용공고 리스트
  recruitmentList: ({ page, limit, status }: API.RecruitmentListRequest) => {
    const params = new URLSearchParams();
    if (page) params.set('page', page);
    if (limit) params.set('limit', limit);
    if (status) params.set('status', status);

    const queryString = params.toString();
    const url = `/employers/recruitment${queryString && `?${queryString}`}`;
    console.log('url: ', url);

    return requests.get<API.RecruitmentListResponse>(url);
  },
};

export const Post = {
  // 본인인증 요청
  certificationStart: (body: void) => requests.post<void, API.CertificationStartResponse>('/certification/start', body),
  // 본인인증 검증
  certificationVerify: (body: any) => requests.post<any, any>('/certification/verify', body),

  //아이디 중복확인
  verificationsEmployerUserId: (body: { userId: string }) =>
    requests.post<{ userId: string }, API.verificationsEmployerUserIdResponse>('/verifications/employer/user-id', body),

  //사업자번호 검증
  businessNumberCheck: (body: { b_no: string }) =>
    requests.post<{ b_no: string }, API.verificationsBusinessNumberCheckResponse>('/verifications/business-number', body),

  // 초기 회사정보 등록
  setupCompany: (body: API.SetupCompanyRequest) =>
    requests.post<API.SetupCompanyRequest, API.SetupCompanyResponse>('/employers/company', body),

  // 사업자 -  채용 공고생성
  createRecruitment: (body: API.CreateRecruitmentRequest) =>
    requests.post<API.CreateRecruitmentRequest, API.CreateRecruitmentResponse>('/employers/recruitment', body),

  // 사업자 -  공고 임시저장
  draftRecruitment: (body: API.DraftRecruitmentRequest) =>
    requests.post<API.DraftRecruitmentRequest, API.DraftRecruitmentResponse>('/employers/recruitment/draft', body),

  // 사업자 -  채용 공고생성
  removeRecruitment: (body: { ids: string[] }) =>
    requests.post<{ ids: string[] }, API.RemoveRecruitmentResponse>('/employers/recruitment/remove', body),
};

export const Patch = {
  // 사업자 -  등록된 공고 수정
  updateRecruitment: (body: API.UpdateRecruitmentRequest) =>
    requests.patch<API.UpdateRecruitmentRequest, API.UpdateRecruitmentResponse>('/employers/recruitment', body),
};

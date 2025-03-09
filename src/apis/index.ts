import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { interceptorHelper } from './interceptorHelper';
import environment from '@/environment';
import * as API from '@/types/API';
import { ApplicantReviewStageStatusKey } from '@/types';

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
    // TODO - 리펙토링
    const shouldLogoutUser = responseData?.error?.code === 'ERR-1020' || responseData?.error?.code === 'ERR-1021' || responseData?.error?.code === 'ERR-1022' || responseData?.error?.code === 'ERR-1002';

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

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <Response>(url: string, config?: AxiosRequestConfig) => instance.get<Response>(url, config).then(responseBody),
  post: <Request, Response>(url: string, body: Request, config?: AxiosRequestConfig) => instance.post<Response>(url, body, config).then(responseBody),
  patch: <Request, Response>(url: string, body: Request, config?: AxiosRequestConfig) => instance.patch<Response>(url, body, config).then(responseBody),
  delete: <Response>(url: string) => instance.delete<Response>(url, config).then(responseBody),
};

export const Internal = {
  checkRefreshCookie: (): Promise<{ result: boolean }> => axios.get('/api/internal/check-cookies').then(responseBody),
};

export const Auth = {
  // 사업자 로그인
  signIn: (body: API.SignInRequest) => requests.post<API.SignInRequest, API.SignInResponse>('/auth/sign-in', body),
  // 사업자 회원가입
  signUpEmployer: (body: API.SignUpEmployerRequest) => requests.post<API.SignUpEmployerRequest, API.SignUpEmployerResponse>('/auth/sign-up', body),
  // 유저정보
  me: (body: {}, config?: AxiosRequestConfig) => requests.post<{}, API.GetUserInfoResponse>('/auth/me', body, config),
  // 엑세스토큰 재요청
  requestAccessToken: (body: {}, config?: AxiosRequestConfig) => requests.post<{}, API.RequestAccessTokenResponse>('/auth/refresh', body, config),
  // 로그아웃
  signOut: (body: void) => requests.post('/auth/sign-out', body),
  // 닉네임 변경
  patchChangeNickname: (body: { newNickname: string }) => requests.patch<{ newNickname: string }, API.PatchChangeNicknameResponse>('/auth/nickname', body),
};

export const OAuth = {
  kakao: (body: API.OAuthSignInRequest) => requests.post<API.OAuthSignInRequest, API.OAuthSignInResponse>('/oauth/kakao', body),
  google: (body: API.OAuthSignInRequest) => requests.post<API.OAuthSignInRequest, API.OAuthSignInResponse>('/oauth/google', body),
};

export const Get = {
  getTests: () => requests.get('/tests'),

  getHealth: () => requests.get('/health'),

  getAccount: () => requests.get('/account'),

  getBusinessUser: () => requests.get('/business-user'),

  // 채용공고 상세
  recruitDetail: ({ id }: { id: string }) => requests.get<API.RecruitDetailResponse>(`/recruit/${id}`),

  // 채용공고 스페셜
  getRecruitSpecialList: ({ page, limit, benefits, employment, experience, job, type }: API.GetRecruitSpecialListRequest) => {
    const params = new URLSearchParams();
    params.set('page', page);
    params.set('limit', limit);
    params.set('type', type);

    if (type) params.set('type', type);
    if (experience) params.set('experience', experience);
    if (employment) employment.forEach((item) => params.append('employment', item));
    if (benefits) benefits.forEach((item) => params.append('benefits', item));
    if (job) {
      if (Array.isArray(job)) {
        job.forEach((item) => params.append('job', item.toLocaleUpperCase()));
      } else {
        params.set('job', job.toLocaleUpperCase());
      }
    }

    const queryString = params.toString();
    const url = `/recruit/special${queryString && `?${queryString}`}`;

    return requests.get<API.GetRecruitSpecialListResponse>(url);
  },

  // 채용공고 급구
  getRecruitUrgentList: ({ page, limit, benefits, employment, experience, job, type }: API.GetRecruitUrgentListRequest) => {
    const params = new URLSearchParams();
    params.set('page', page);
    params.set('limit', limit);
    params.set('type', type);

    if (type) params.set('type', type);
    if (experience) params.set('experience', experience);
    if (employment) employment.forEach((item) => params.append('employment', item));
    if (benefits) benefits.forEach((item) => params.append('benefits', item));
    if (job) {
      if (Array.isArray(job)) {
        job.forEach((item) => params.append('job', item.toLocaleUpperCase()));
      } else {
        params.set('job', job.toLocaleUpperCase());
      }
    }

    const queryString = params.toString();
    const url = `/recruit/urgent${queryString && `?${queryString}`}`;

    return requests.get<API.GetRecruitUgentListResponse>(url);
  },

  // 채용공고 일반
  getRecruitBasicList: ({ page, limit, experience, benefits, employment, job, type }: API.GetRecruitBasicListRequest) => {
    const params = new URLSearchParams();
    params.set('page', page);
    params.set('limit', limit);
    params.set('type', type);

    if (type) params.set('type', type);
    if (experience) params.set('experience', experience);

    if (employment) employment.forEach((item) => params.append('employment', item));

    if (benefits) benefits.forEach((item) => params.append('benefits', item));

    if (job) {
      if (Array.isArray(job)) {
        job.forEach((item) => params.append('job', item.toLocaleUpperCase()));
      } else {
        params.set('job', job.toLocaleUpperCase());
      }
    }

    const queryString = params.toString();
    const url = `/recruit/basic${queryString && `?${queryString}`}`;

    return requests.get<API.GetRecruitBasicListResponse>(url);
  },

  // 인재풀 리스트
  getTalentList: ({ page, limit }: API.GetTalentListRequest) => {
    const params = new URLSearchParams();
    if (page) params.set('page', page);
    if (limit) params.set('limit', limit);

    const queryString = params.toString();
    const url = `/talents${queryString && `?${queryString}`}`;
    return requests.get<API.GetTalentListResponse>(url);
  },

  // 유저 - 프로필정보
  getApplicantProfile: () => requests.get<API.GetApplicantProfileResponse>(`/applicants/profile`),

  // 유저 - 이력서 상세정보
  getResumeEdit: ({ id }: { id: string }) => requests.get<API.GetResumeEditResponse>(`/resumes/${id}/edit`),

  // 유저 - 이력서 상세정보
  getResumeDetail: ({ id }: { id: string }) => requests.get<API.GetResumeDetailResponse>(`/resumes/${id}`),

  // 유저 - 이력서 리스트
  getResumeList: () => requests.get<API.GetResumeListResponse>(`/resumes`),

  // 유저 - 지원가능한 이력서 리스트

  // 유저 - 지원가능한 이력서 리스트
  getAvailableResumeList: () => requests.get<API.GetAvailableResumeList>(`/resumes/available`),

  // 유저 - 채용공고 지원내역
  getApplicationHistory: ({ status }: { status?: ApplicantReviewStageStatusKey }) => {
    const params = new URLSearchParams();
    if (status) params.set('status', status);

    const queryString = params.toString();

    const url = `/applications/history${queryString && `?${queryString}`}`;

    return requests.get<API.GetApplicationHistoryResponse>(url);
  },

  // TODO - 타입정의
  // 유저 - 채용공고 지원내역 상태 계수
  getApplicationHistoryStatus: () => requests.get<API.GetApplicationHistoryStatusResponse>(`/applications/history/status`),

  // 유저 - 지원가능 여부 체크
  applicationApplyCheck: ({ id }: { id: string }) => requests.get<API.ApplicationApplyCheckResponse>(`/applications/${id}/apply/check`),

  // 사업자 -  계정정보
  employerAccountInfo: () => requests.get<API.EmployerAccountInfoResponse>('/employers'),

  // 사업자 - 회사정보 가져오기
  employerCompany: () => requests.get<API.GetMyCompanyResponse>('/employers/company'),

  // 사업자 - 채용공고 상세정보
  recruitmentDetail: ({ id }: { id: string }) => requests.get<API.RecruitmentDetailResponse>(`/employers/recruitment/${id}`),

  // 사업자 - 채용공고 목록 상태별 수량 집계
  recruitmentStatusCount: () => requests.get<API.RecruitmentStatusCountResponse>(`/employers/recruitment/status`),

  // TODO - 타입정의
  // 사업자 - 지원자관리 목록 상태별 수량 집계
  recruitmentApplicationStatusCount: ({ id }: { id: string }) => requests.get<API.RecruitmentApplicationStatusCountResponse>(`/applications/recruitment/${id}/status`),

  // 사업자 - 채용공고 별 지원자 리스트
  getRecruitmentDetailApplicantList: ({ recruitmentId, step }: API.GetRecruitmentDetailApplicantListRequest) => {
    const params = new URLSearchParams();
    if (step) params.set('step', step);

    const queryString = params.toString();

    const url = `/applications/recruitment/${recruitmentId}${queryString && `?${queryString}`}`;

    return requests.get<API.GetRecruitmentDetailApplicantListResponse>(url);
  },

  // 사업자 - 채용공고 총지원자, 열람, 미열람 상세정보 카운트
  getRecruitmentDetailApplicationCount: ({ recruitmentId }: { recruitmentId: string }) => requests.get<API.GetRecruitmentDetailApplicationCountResponse>(`/employers/recruitment/${recruitmentId}/applications/count`),

  // 사업자 - 채용공고 상품 리스트
  getPublishedRecruitmentList: () => requests.get<API.GetPublishedRecruitmentListResponse>(`/employers/recruitment/published`),

  // 사업자 - 채용공고 리스트
  recruitmentList: ({ page, limit, status }: API.RecruitmentListRequest) => {
    const params = new URLSearchParams();
    if (page) params.set('page', page);
    if (limit) params.set('limit', limit);
    if (status) params.set('status', status);

    const queryString = params.toString();
    const url = `/employers/recruitment${queryString && `?${queryString}`}`;

    return requests.get<API.RecruitmentListResponse>(url);
  },

  // TODO - 타입정의
  // 사업자 - 채용공고 상품 리스트
  getProductRecruitmentList: ({ type }: { type: API.ProductRecruitmentQuery }) => {
    const params = new URLSearchParams();
    if (type) params.set('type', type);

    const queryString = params.toString();
    const url = `/products/recruitment${queryString && `?${queryString}`}`;

    return requests.get<API.GetProductRecruitmentList>(url);
  },
  // *************************************** FILE ***************************************
  //이력서 이미지 가져오기
  getResumeProfileImage: (key: string, config: AxiosRequestConfig) => requests.get<any>(`/upload/resume/profile/${key}`, config),

  // *************************************** PAYMENT  ***************************************
  // 사업자 채용공고 결제 초기요청
  getPaymentRecruitmentDetail: ({ orderId }: { orderId: string }) =>
    requests.get<API.GetPaymentRecruitmentDetailResponse>(`/payment/recruitment/${orderId}`),
  // 사업자 - 상품 결제 내역
  getEmployerPaymentList: () => requests.get<API.GetEmployerPaymentListResponse>(`/payment`),

  // *************************************** COUPON  ***************************************
  // 사업자 - 쿠폰 리스트
  getEmployerCouponList: ({ use }: { use: 'Y' | 'N' }) => {
    const params = new URLSearchParams();
    if (use) params.set('use', use);

    const queryString = params.toString();

    const url = `/coupon/employer${queryString && `?${queryString}`}`;

    return requests.get<API.GetEmployerCouponList>(url);
  },

  // ***************************************  NOTIFICATION  ***************************************
  // 알림 리스트
  getNotificationList: ({ page, limit }: API.GetNotificationListRequest) => {
    const params = new URLSearchParams();
    if (page) params.set('page', page);
    if (limit) params.set('limit', limit);

    const queryString = params.toString();
    const url = `/notification${queryString && `?${queryString}`}`;

    return requests.get<API.GetNotificationListResponse>(url);
  },
};

export const Post = {
  // 본인인증 요청 시작
  certificationStart: (body: void) => requests.post<void, API.CertificationStartResponse>('/certification/start', body),

  // 본인인증 검증 및 저장(사업자 무료 쿠폰발급)
  accountCertificationVerify: (body: any) => requests.post<any, API.AccountCertificationVerifyResponse>('/certification/account/verify', body),

  // 비밀번호 찾기 - 본인인증 검증
  resetCertificationVerify: (body: any) => requests.post<any, API.ResetCertificationVerifyResponse>('/certification/reset/verify', body),

  //유저 - 이력서 생성
  createResume: (body: void) => requests.post<void, API.CreateResumeResponse>('/resumes', body),

  //TODO - 타입정의
  //유저 - 이력서 작성 완료
  publishResume: (body: any) => requests.post<void, API.CreateResumeResponse>('/resumes/publish', body),

  //TODO - 타입정의
  //유저 - 이력서 제출
  applyResume: (body: API.ApplyResumeRequest) => requests.post<API.ApplyResumeRequest, any>('/applications/apply', body),

  //아이디 중복확인
  verificationsEmployerUserId: (body: { userId: string }) => requests.post<{ userId: string }, API.verificationsEmployerUserIdResponse>('/verifications/employer/user-id', body),

  // *************************************** EMPLOYER ***************************************
  //사업자번호 검증
  businessNumberCheck: (body: { b_no: string }) =>
    requests.post<{ b_no: string }, API.verificationsBusinessNumberCheckResponse>('/verifications/business-number', body),

  //초기 회사정보 등록
  setupCompany: (body: API.SetupCompanyRequest) => requests.post<API.SetupCompanyRequest, API.SetupCompanyResponse>('/employers/company', body),

  //채용 공고생성
  createRecruitment: (body: API.CreateRecruitmentRequest) => requests.post<API.CreateRecruitmentRequest, API.CreateRecruitmentResponse>('/employers/recruitment', body),

  // 공고 임시저장
  draftRecruitment: (body: API.DraftRecruitmentRequest) => requests.post<API.DraftRecruitmentRequest, API.DraftRecruitmentResponse>('/employers/recruitment/draft', body),

  // 채용공고 삭제
  removeRecruitment: (body: { ids: string[] }) => requests.post<{ ids: string[] }, API.RemoveRecruitmentResponse>('/employers/recruitment/remove', body),

  // *************************************** EMPLOYER APPLICATIONS ***************************************
  // 합격자 발표
  createApplicationsAnnouncement: (body: API.CreateApplicationsAnnouncementRequest) => requests.post<API.CreateApplicationsAnnouncementRequest, any>('/applications/announcements', body),

  // *************************************** FILE UPLOAD ***************************************
  // 프로필 이미지 업로드
  uploadProfileImage: (body: FormData) => requests.post<FormData, API.UploadProfileImageResponse>('/upload/resume/profile', body),

  // *************************************** PUSH  ***************************************
  // FCM 토큰 저장
  saveFcmToken: (body: API.SaveFcmTokenRequest) => requests.post<API.SaveFcmTokenRequest, API.SaveFcmTokenResponse>('/notification/push/token', body),

  // *************************************** EMPLOYER PAYMENT  ***************************************
  // TODO - type 정의
  // 채용공고 결제 초기요청
  paymentRecruitmentInitiate: (body: any) => requests.post<any, API.PaymentRecruitmentInitiateResponse>('/payment/recruitment/initiate', body),

  // 채용공고 결제 승인요청
  paymentRecruitmentConfirm: (body: API.PaymentRecruitmentConfirmRequest) => requests.post<API.PaymentRecruitmentConfirmRequest, API.PaymentRecruitmentConfirmResponse>('/payment/recruitment/confirm', body),

  // 채용공고 무료 승인요청
  paymentFreeRecruitmentConfirm: (body: API.PaymentRecruitmentFreeConfirmRequest) => requests.post<API.PaymentRecruitmentFreeConfirmRequest, API.PaymentRecruitmentConfirmResponse>('/payment/recruitment/confirm/free', body),

  // 채용공고 사용가능한 쿠폰리스트
  availableCouponList: (body: { orderId: string }) => requests.post<{ orderId: string }, API.AvailableCouponListResponse>('/payment/recruitment/coupon', body),

  // 채용공고 쿠폰 적용
  applyCoupon: (body: { orderId: string; couponId: string }) => requests.post<{ orderId: string; couponId: string }, API.ApplyCouponResponse>('/payment/recruitment/coupon/apply', body),

  // 채용공고 쿠폰 적용 취소
  cancelCoupon: (body: { orderId: string; couponId: string }) => requests.post<{ orderId: string; couponId: string }, any>('/payment/recruitment/coupon/cancel', body),
};

export const Patch = {
  // 사업자 -  등록된 공고 수정
  updateRecruitment: (body: API.UpdateRecruitmentRequest) => requests.patch<API.UpdateRecruitmentRequest, API.UpdateRecruitmentResponse>('/employers/recruitment', body),

  // 사업자 - 지원자의 전형상태 변경
  updateEmployerReviewStageStatus: (body: API.UpdateEmployerReviewStageStatusRequest) => requests.patch<API.UpdateEmployerReviewStageStatusRequest, API.UpdateEmployerReviewStageStatusResponse>('/applications/recruitment/status/review-stage', body),

  // 사업자 - 이력서 열람처리
  updateApplicationResumeView: (body: { applicationId: number }) => requests.patch<{ applicationId: number }, API.UpdateApplicationResumeView>('/applications/view', body),

  // 사업자 - 채용공고 마감
  closedRecruitment: (body: { recruitmentId: string }) => requests.patch<{ recruitmentId: string }, API.RemoveRecruitmentResponse>('/employers/recruitment/close', body),
  
  // 사업자 - 비밀번호 변경
  employerAccountReset: (body: API.EmployerAccountResetRequest) => requests.patch<API.EmployerAccountResetRequest, API.EmployerAccountResetResponse>('/employers/account/reset', body),

  // 유저 - 공고 지원취소
  cancelApplication: (body: { applicationId: number }) => requests.patch<{ applicationId: number }, API.CancelApplicationResponse>('/applications/cancel', body),
};

export const Delete = {
  //유저 - 이력서 삭제
  deleteResume: ({ resumeId }: { resumeId: string }) => requests.delete<API.DeleteResumeResponse>(`/resumes/${resumeId}`),

  //유저 - 계정삭제 요청
  deactivateApplicantUser: () => requests.delete<API.DeactivateApplicantUserResponse>(`/applicants/deactivate`),
};

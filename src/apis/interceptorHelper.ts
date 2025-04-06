import axios, { AxiosResponse } from 'axios';
import { instance, Auth } from '@/apis';

const ALLOW_AUTHENTICATION_PATH = ['/auth/sign-in', '/oauth/kakao', '/auth/refresh'];

// 로그인 시 응답값 중 accessToken을 받아와서 axios header에 추가
const handleSuccessResponse = (config: AxiosResponse) => {
  if (!config.config?.url) {
    return;
  }
  if (ALLOW_AUTHENTICATION_PATH.includes(config.config.url)) {
    const accessToken = config.data?.result?.accessToken;
    if (!accessToken) {
      throw new Error('Access token is missing');
    }
    instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }
};

// accessToken 만료 시 refreshToken을 통해 새로운 accessToken을 받아옴
const handleRequestAccessToken = async (originalRequest: any) => {
  try {
    const response = await Auth.requestAccessToken({});
    if (!response.success) {
      throw new Error();
    }
    const newAccessToken = response.result.accessToken;
    instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
    return instance(originalRequest);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('refresh-token error : ', error.response?.data);
    }
  }
};

const handleInvalidRefreshToken = async () => {
  if (typeof window === 'undefined') {
    return;
  }
  await Auth.signOut();
  window.location.href = '/sign-in';
  alert('로그인 정보가 만료되었습니다.');
};

export const interceptorHelper = { handleSuccessResponse, handleRequestAccessToken, handleInvalidRefreshToken };

import axios, { AxiosResponse } from 'axios';
import { instance, Post } from '@/apis';

const ALLOW_AUTHENTICATION_PATH = ['/auth/sign-in', '/oauth/kakao', '/auth/refresh'];

const handleSuccessResponse = (config: AxiosResponse) => {
  if (!config.config?.url) {
    return;
  }
  console.log('config.config?.url: ', config.config?.url);
  // 지정된 API 경로에 대해서만 토큰을 설정합니다.
  if (ALLOW_AUTHENTICATION_PATH.includes(config.config.url)) {
    const accessToken = config.data?.result?.accessToken;
    if (!accessToken) {
      throw new Error('Access token is missing');
    }
    instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }
};

const handleRequestAccessToken = async (originalRequest: any) => {
  try {
    const response = await Post.requestAccessToken();
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

const handleInvalidRefreshToken = () => {
  if (typeof window === 'undefined') {
    return;
  }
  alert('로그인 정보가 만료되었습니다.');
  window.location.href = '/sign-in';
};

export const interceptorHelper = { handleSuccessResponse, handleRequestAccessToken, handleInvalidRefreshToken };

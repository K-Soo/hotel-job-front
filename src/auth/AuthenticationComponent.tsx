import React from 'react';
import { Internal, Auth } from '@/apis';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import useFetchQuery from '@/hooks/useFetchQuery';
import queryKeys from '@/constants/queryKeys';

export const EXCLUDED_PATHS = ['/oauth/kakao/callback', '/oauth/google/callback', '/sign-in', '/sign-up'];

export default function AuthenticationComponent() {
  const router = useRouter();

  const { isAuthenticated, setAuthAtomState } = useAuth();

  const isExcludedPath = EXCLUDED_PATHS.includes(router.pathname);

  // 쿠키 존재 여부 확인
  const { data: cookieData } = useFetchQuery({
    queryKey: [queryKeys.REFRESH_COOKIE],
    queryFn: Internal.checkRefreshCookie,
    options: {
      staleTime: 0,
      gcTime: 0,
      enabled: !isAuthenticated && !isExcludedPath, // 인증된 사용자와 제외 경로에서는 실행 안 함
    },
  });

  // 사용자 정보 가져오기
  const { data: userInfoData, isLoading } = useFetchQuery({
    queryKey: [queryKeys.USER_INFO],
    queryFn: Auth.me,
    options: {
      enabled: !isAuthenticated && !!cookieData?.result && !isExcludedPath,
      staleTime: 60 * 1000 * 5,
      gcTime: 60 * 1000 * 10,
    },
  });

  console.log('ME API : ', userInfoData);

  React.useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!userInfoData) {
      return setAuthAtomState((prev) => ({
        ...prev,
        status: 'AUTHENTICATION_FAILURE',
      }));
    }

    if (userInfoData) {
      setAuthAtomState({
        ...userInfoData.result,
        status: 'AUTHENTICATED',
      });
    }
  }, [userInfoData, isLoading]);

  return null;
}

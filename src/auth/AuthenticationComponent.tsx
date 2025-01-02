import React from 'react';
import { Internal, Post } from '@/apis';
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
  const { data: userInfoData } = useFetchQuery({
    queryKey: [queryKeys.USER_INFO],
    queryFn: Post.authMe,
    options: {
      staleTime: 60 * 1000 * 5,
      gcTime: 60 * 1000 * 10,
      enabled: !isAuthenticated && cookieData?.result, // 쿠키가 확인된 경우에만 실행
    },
  });

  React.useEffect(() => {
    if (!userInfoData) return;
    if (!userInfoData.success) return;

    setAuthAtomState({
      ...userInfoData.result,
      status: 'AUTHENTICATED',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfoData]);

  return null;
}

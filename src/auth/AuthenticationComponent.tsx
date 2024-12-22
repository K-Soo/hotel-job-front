import React from 'react';
import { Internal, Post } from '@/apis';
import { useRouter } from 'next/router';
import { EXCLUDED_PATHS } from '@/constants/path';
import useAuth from '@/hooks/useAuth';

export default function AuthenticationComponent() {
  const router = useRouter();

  const { isAuthenticated, setAuthAtomState } = useAuth();

  React.useEffect(() => {
    if (EXCLUDED_PATHS.includes(router.pathname)) {
      return;
    }
    if (isAuthenticated) {
      return;
    }
    (async () => {
      try {
        const cookieExist = await Internal.checkRefreshCookie();
        if (!cookieExist) return;

        const response = await Post.getUserInfo();
        console.log('유저정보 API : ', response);
        if (!response.success) {
          throw new Error();
        }
        setAuthAtomState({
          provider: response.result.provider,
          role: response.result.role,
          status: 'AUTHENTICATED',
        });
      } catch (error) {
        console.log('auth error: ', error);
      }
    })();
  }, [isAuthenticated, router.pathname]);

  return null;
}

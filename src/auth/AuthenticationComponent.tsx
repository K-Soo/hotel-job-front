import React from 'react';
import { Internal, Post } from '@/apis';
import { useRouter } from 'next/router';
import { EXCLUDED_PATHS } from '@/constants/path';
import useAuth from '@/hooks/useAuth';

export default function AuthenticationComponent() {
  const router = useRouter();

  const { isAuthenticated, setAuthAtomState } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      return;
    }

    if (EXCLUDED_PATHS.includes(router.pathname)) {
      return;
    }

    (async () => {
      try {
        const cookieExist = await Internal.checkRefreshCookie();
        if (!cookieExist) return;

        const response = await Post.getUserInfo({});
        console.log('유저정보 API : ', response);
        if (!response.success) {
          throw new Error();
        }
        setAuthAtomState({
          ...response.result,
          status: 'AUTHENTICATED',
        });
      } catch (error) {
        console.log('auth error: ', error);
      }
    })();
  }, [isAuthenticated, router.pathname]);

  return null;
}
